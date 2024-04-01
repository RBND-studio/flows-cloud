import { Injectable } from "@nestjs/common";
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
    const orgResults = await this.databaseService.db
      .select({
        subscription_id: subscriptions.id,
        start_limit: organizations.start_limit,
      })
      .from(organizations)
      .leftJoin(subscriptions, eq(subscriptions.organization_id, organizations.id))
      .where(
        and(
          eq(organizations.id, organizationId),
          // Only active subscriptions make the organization paid
          eq(subscriptions.status, "active"),
        ),
      );

    const orgResult = orgResults.at(0);

    if (orgResult?.subscription_id) return orgResult.start_limit;

    return FREE_LIMIT;
  }

  async getIsOrganizationLimitReachedByProject({
    projectId,
  }: {
    projectId: string;
  }): Promise<boolean> {
    const results = await this.databaseService.db
      .select({
        organization_id: organizations.id,
        subscription_id: subscriptions.id,
        start_limit: organizations.start_limit,
        event_count: sql<number>`cast(count(*) as int)`,
      })
      .from(projects)
      .leftJoin(organizations, eq(projects.organization_id, organizations.id))
      .leftJoin(
        subscriptions,
        and(
          eq(subscriptions.organization_id, organizations.id),
          eq(subscriptions.status, "active"),
        ),
      )
      .leftJoin(flows, eq(flows.project_id, projects.id))
      .leftJoin(events, eq(events.flow_id, flows.id))
      .where(
        and(
          eq(projects.id, projectId),
          eq(events.event_type, "startFlow"),
          gte(events.event_time, sql`DATE_TRUNC('month', CURRENT_DATE)`),
        ),
      )
      .groupBy(organizations.id, subscriptions.id);

    const result = results.at(0);
    if (!result) return true;

    const limit = (() => {
      if (result.subscription_id && result.start_limit !== null) return result.start_limit;
      return FREE_LIMIT;
    })();

    return result.event_count >= limit;
  }
}
