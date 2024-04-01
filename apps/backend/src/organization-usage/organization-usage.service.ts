import { Injectable, NotFoundException } from "@nestjs/common";
import { events, flows, organizations, projects, subscriptions } from "db";
import { and, eq, gte, sql } from "drizzle-orm";

import { DatabaseService } from "../database/database.service";

const FREE_LIMIT = 1000;

@Injectable()
export class OrganizationUsageService {
  constructor(private databaseService: DatabaseService) {}

  async getOrganizationUsage({ organizationId }: { organizationId: string }): Promise<number> {
    const activeSubscription = await this.databaseService.db.query.subscriptions.findFirst({
      columns: { renews_at: true },
      where: and(
        eq(subscriptions.organization_id, organizationId),
        // Only active subscriptions make the organization paid
        eq(subscriptions.status, "active"),
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
      .leftJoin(organizations, eq(projects.organization_id, organizations.id))
      .where(
        and(
          eq(organizations.id, organizationId),
          eq(events.event_type, "startFlow"),
          gte(events.event_time, eventTimeCompareValue),
        ),
      );

    return usage.at(0)?.count ?? 0;
  }

  async getOrganizationLimit({ organizationId }: { organizationId: string }): Promise<number> {
    const subscriptionResult = await this.databaseService.db.query.subscriptions.findFirst({
      columns: {},
      where: and(
        eq(subscriptions.organization_id, organizationId),
        eq(subscriptions.status, "active"),
      ),
      with: {
        organization: {
          columns: {
            start_limit: true,
          },
        },
      },
    });

    if (!subscriptionResult) return FREE_LIMIT;

    return subscriptionResult.organization.start_limit;
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
