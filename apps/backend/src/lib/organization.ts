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

const FREE_LIMIT = 1000;

export const getOrganizationLimit = async ({
  databaseService,
  organizationId,
}: {
  organizationId: string;
  databaseService: DatabaseService;
}): Promise<number> => {
  const orgResults = await databaseService.db
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
};

export const getIsOrganizationLimitReachedByProject = async ({
  databaseService,
  projectId,
}: {
  projectId: string;
  databaseService: DatabaseService;
}): Promise<boolean> => {
  const results = await databaseService.db
    .select({
      organization_id: organizations.id,
      subscription_id: subscriptions.id,
      start_limit: organizations.start_limit,
      event_count: sql<number>`cast(count(*) as int)`,
    })
    .from(projects)
    .leftJoin(organizations, eq(projects.organization_id, organizations.id))
    .leftJoin(subscriptions, eq(subscriptions.organization_id, organizations.id))
    .leftJoin(flows, eq(flows.project_id, projects.id))
    .leftJoin(events, eq(events.flow_id, flows.id))
    .where(
      and(
        eq(projects.id, projectId),
        eq(subscriptions.status, "active"),
        eq(events.event_type, "startFlow"),
        gte(events.event_time, sql`DATE_TRUNC('month', CURRENT_DATE)`),
      ),
    )
    .groupBy(organizations.id, subscriptions.id);

  const result = results.at(0);
  if (
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain -- eslint is wrong here
    !result ||
    result.organization_id === null ||
    result.start_limit === null ||
    result.subscription_id === null
  )
    return true;

  const limit = (() => {
    if (result.subscription_id) return result.start_limit;
    return FREE_LIMIT;
  })();

  return result.event_count >= limit;
};
