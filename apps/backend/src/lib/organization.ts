import { events, flows, organizations, projects, subscriptions } from "db";
import { and, eq, gte, sql } from "drizzle-orm";

import { type DatabaseService } from "../database/database.service";

export const getOrganizationUsage = async ({
  databaseService,
  organizationId,
}: {
  organizationId: string;
  databaseService: DatabaseService;
}): Promise<number> => {
  const usage = await databaseService.db
    .select({
      count: sql<number>`cast(count(*) as int)`,
    })
    .from(events)
    .leftJoin(flows, eq(events.flow_id, flows.id))
    .leftJoin(projects, eq(flows.project_id, projects.id))
    .leftJoin(organizations, eq(projects.organization_id, organizations.id))
    .where(
      and(
        eq(organizations.id, organizationId),
        eq(events.event_type, "startFlow"),
        gte(events.event_time, sql`DATE_TRUNC('month', CURRENT_DATE)`),
      ),
    );

  return usage.at(0)?.count ?? 0;
};

export const getOrganizationLimit = async ({
  databaseService,
  organizationId,
}: {
  organizationId: string;
  databaseService: DatabaseService;
}): Promise<number> => {
  const subscriptionsResult = await databaseService.db
    .select({ subscription_status: subscriptions.status })
    .from(subscriptions)
    .leftJoin(organizations, eq(subscriptions.organization_id, organizations.id))
    .where(eq(organizations.id, organizationId));

  const subscriptionStatus = subscriptionsResult.at(0)?.subscription_status;

  if (subscriptionStatus === "active") return 1000000;

  return 1000;
};
