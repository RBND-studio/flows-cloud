import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { events, flows, organizations, projects, subscriptions } from "db";
import { and, eq, gte, inArray, sql } from "drizzle-orm";
import { FREE_LIMIT } from "shared";

import { DatabaseService } from "../database/database.service";

@Injectable()
export class OrganizationUsageService {
  constructor(private databaseService: DatabaseService) {}

  async getOrganizationUsage({ organizationId }: { organizationId: string }): Promise<number> {
    const activeSubscription = await this.databaseService.db.query.subscriptions.findFirst({
      columns: { renews_at: true },
      where: and(
        eq(subscriptions.organization_id, organizationId),
        inArray(subscriptions.status, ["active", "past_due"]),
      ),
    });

    const eventTimeCompareValue = activeSubscription
      ? // With an active subscription, show usage from the current billing period
        sql`${activeSubscription.renews_at} - interval '1 month'`
      : // If there is no active subscription, show usage from the current calendar month
        sql`DATE_TRUNC('month', CURRENT_DATE)`;

    const usage = await this.databaseService.db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(events)
      .leftJoin(flows, eq(events.flow_id, flows.id))
      .leftJoin(projects, eq(flows.project_id, projects.id))
      .where(
        and(
          eq(projects.organization_id, organizationId),
          eq(events.event_type, "startFlow"),
          gte(events.event_time, eventTimeCompareValue),
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
}
