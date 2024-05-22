import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import {
  events,
  flows,
  organizationEvents,
  organizations,
  organizationsToUsers,
  projects,
  subscriptions,
} from "db";
import { and, eq, gt, gte, inArray, type SQL, sql } from "drizzle-orm";
import { FREE_LIMIT } from "shared";

import { DatabaseService } from "../database/database.service";
import { EmailService } from "../email/email.service";
import { type OrganizationUsageAlertType } from "../types/organization";

const alertUsageLimitCoefficient: Record<OrganizationUsageAlertType, number> = {
  approachingUsageLimit: 0.8,
  exceededUsageLimit: 1,
};
const usageAlerts = Object.keys(alertUsageLimitCoefficient) as OrganizationUsageAlertType[];

@Injectable()
export class OrganizationUsageService {
  constructor(
    private databaseService: DatabaseService,
    private emailService: EmailService,
  ) {}

  getOrganizationBillingPeriodStartSQL({ organizationId }: { organizationId: string }): SQL<Date> {
    const activeSubscriptionQuery = this.databaseService.db
      .select({
        periodStart: sql<Date>`${subscriptions.renews_at} - interval '1 month'`.as("periodStart"),
      })
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.organization_id, organizationId),
          inArray(subscriptions.status, ["active", "past_due"]),
        ),
      );

    // With an active subscription, period starts a month before the subscription renews
    // If there is no active subscription, period starts at the beginning of the month
    return sql`coalesce(${activeSubscriptionQuery}, DATE_TRUNC('month', CURRENT_DATE))`;
  }

  async getOrganizationUsage({ organizationId }: { organizationId: string }): Promise<number> {
    const usage = await this.databaseService.db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(events)
      .leftJoin(flows, eq(events.flow_id, flows.id))
      .leftJoin(projects, eq(flows.project_id, projects.id))
      .where(
        and(
          eq(projects.organization_id, organizationId),
          eq(events.event_type, "startFlow"),
          gte(events.event_time, this.getOrganizationBillingPeriodStartSQL({ organizationId })),
        ),
      );

    return usage.at(0)?.count ?? 0;
  }

  async getOrganizationLimit({ organizationId }: { organizationId: string }): Promise<number> {
    const results = await this.databaseService.db
      .select({
        subscriptionId: subscriptions.id,
        organizationStartLimit: organizations.start_limit,
        organizationFreeStartLimit: organizations.free_start_limit,
      })
      .from(organizations)
      .leftJoin(
        subscriptions,
        and(
          eq(subscriptions.organization_id, organizations.id),
          inArray(subscriptions.status, ["active", "past_due"]),
        ),
      )
      .where(eq(organizations.id, organizationId));

    const result = results.at(0);
    if (!result) throw new InternalServerErrorException();

    if (result.subscriptionId) return result.organizationStartLimit;

    return result.organizationFreeStartLimit ?? FREE_LIMIT;
  }

  async getIsOrganizationLimitReachedByProject({
    projectId,
  }: {
    projectId: string;
  }): Promise<boolean> {
    const project = await this.databaseService.db.query.projects.findFirst({
      where: eq(projects.id, projectId),
      columns: { organization_id: true },
    });
    if (!project) throw new NotFoundException();
    const organizationId = project.organization_id;

    const [limit, usage] = await Promise.all([
      this.getOrganizationLimit({ organizationId }),
      this.getOrganizationUsage({ organizationId }),
    ]);

    return usage >= limit;
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handlePeriodicSchedule(): Promise<void> {
    const orgs = await this.databaseService.db.query.organizations.findMany({
      columns: { id: true },
    });
    await Promise.all(
      orgs.flatMap((org) =>
        usageAlerts.map((alert) => this.sendUsageAlertIfNeeded({ alert, organizationId: org.id })),
      ),
    );
  }

  async sendUsageAlertIfNeeded({
    organizationId,
    alert,
  }: {
    organizationId: string;
    alert: OrganizationUsageAlertType;
  }): Promise<void> {
    const existingEvent = await this.databaseService.db.query.organizationEvents.findFirst({
      columns: { id: true },
      where: and(
        eq(organizationEvents.organization_id, organizationId),
        eq(organizationEvents.event_type, alert),
        gt(
          organizationEvents.created_at,
          this.getOrganizationBillingPeriodStartSQL({ organizationId }),
        ),
      ),
    });
    if (existingEvent) return;

    const [limit, usage] = await Promise.all([
      this.getOrganizationLimit({ organizationId }),
      this.getOrganizationUsage({ organizationId }),
    ]);

    if (usage < limit * alertUsageLimitCoefficient[alert]) return;

    await this.databaseService.db
      .insert(organizationEvents)
      .values({ organization_id: organizationId, event_type: alert });

    const [organization, users] = await Promise.all([
      this.databaseService.db.query.organizations.findFirst({
        where: eq(organizations.id, organizationId),
        columns: { name: true },
      }),
      this.databaseService.db.query.organizationsToUsers.findMany({
        where: eq(organizationsToUsers.organization_id, organizationId),
        with: { user: { columns: { email: true } } },
        columns: {},
      }),
    ]);

    if (!organization) throw new InternalServerErrorException("Organization not found");
    const emails = users.flatMap(({ user }) => user.email ?? []);

    await Promise.all(
      emails.map((email) => {
        return this.emailService.sendUsageAlert({
          email,
          organizationName: organization.name,
          limit,
          usage,
          type: alert,
        });
      }),
    );
  }
}
