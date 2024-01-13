import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import dayjs from "dayjs";
import { events, flows, flowVersions, organizations, organizationsToUsers, projects } from "db";
import { and, desc, eq, gt, gte, lte, sql } from "drizzle-orm";
import { alias, union } from "drizzle-orm/pg-core";
import slugify from "slugify";

import type { Auth } from "../auth";
import { DatabaseService } from "../database/database.service";
import { DbPermissionService } from "../db-permission/db-permission.service";
import type {
  CreateFlowDto,
  FlowVersionDto,
  GetFlowAnalyticsDto,
  GetFlowDetailDto,
  GetFlowsDto,
  GetFlowVersionsDto,
  UpdateFlowDto,
} from "./flows.dto";

@Injectable()
export class FlowsService {
  constructor(
    private databaseService: DatabaseService,
    private dbPermissionService: DbPermissionService,
  ) {}

  async getFlows({ auth, projectId }: { auth: Auth; projectId: string }): Promise<GetFlowsDto[]> {
    await this.dbPermissionService.doesUserHaveAccessToProject({ auth, projectId });

    const projectFlows = await this.databaseService.db.query.flows.findMany({
      where: eq(flows.project_id, projectId),
      orderBy: [desc(flows.updated_at)],
      columns: {
        id: true,
        human_id: true,
        project_id: true,
        name: true,
        flow_type: true,
        description: true,
        created_at: true,
        updated_at: true,
        enabled_at: true,
        preview_url: true,
      },
    });

    return projectFlows.map(
      (flow): GetFlowsDto => ({
        id: flow.id,
        name: flow.name,
        description: flow.description,
        created_at: flow.created_at,
        updated_at: flow.updated_at,
        enabled_at: flow.enabled_at,
        project_id: flow.project_id,
        flow_type: flow.flow_type,
        human_id: flow.human_id,
        preview_url: flow.preview_url,
      }),
    );
  }

  async getFlowDetail({ auth, flowId }: { auth: Auth; flowId: string }): Promise<GetFlowDetailDto> {
    const draftFlowVersion = alias(flowVersions, "draftFlowVersion");
    const publishedFlowVersion = alias(flowVersions, "publishedFlowVersion");

    const complexQuery = await this.databaseService.db
      .select()
      .from(flows)
      .leftJoin(projects, eq(flows.project_id, projects.id))
      .leftJoin(organizations, eq(projects.organization_id, organizations.id))
      .leftJoin(
        organizationsToUsers,
        and(
          eq(organizations.id, organizationsToUsers.organization_id),
          eq(organizationsToUsers.user_id, auth.userId),
        ),
      )
      .leftJoin(draftFlowVersion, eq(flows.draft_version_id, draftFlowVersion.id))
      .leftJoin(publishedFlowVersion, eq(flows.published_version_id, publishedFlowVersion.id))
      .where(eq(flows.id, flowId));

    if (!complexQuery.length) throw new NotFoundException();
    const data = complexQuery[0];
    if (!data.project) throw new NotFoundException();
    if (!data.organization_to_user) throw new ForbiddenException();

    const uniqueUsersQuerySql = this.databaseService.db
      .select({
        type: sql<string>`'uniqueUsers'`,
        count: sql<number>`cast(count(${events.user_hash}) as int)`,
        uniqueUsers: sql<number>`0`,
      })
      .from(events)
      .where(
        and(eq(events.flow_id, flowId), gt(events.event_time, sql`now() - interval '30 day'`)),
      );

    const previewStatsQuerySql = this.databaseService.db
      .select({
        type: events.type,
        count: sql<number>`cast(count(${events.id}) as int)`,
        uniqueUsers: sql<number>`cast(count(distinct ${events.user_hash}) as int)`,
      })
      .from(events)
      .where(and(eq(events.flow_id, flowId), gt(events.event_time, sql`now() - interval '30 day'`)))
      .groupBy(events.type);

    const stats = await union(previewStatsQuerySql, uniqueUsersQuerySql);

    const createFlowVersionDto = (
      version?: typeof flowVersions.$inferSelect | null,
    ): FlowVersionDto | undefined => {
      if (!version) return;
      return {
        frequency: version.frequency,
        steps: version.data.steps,
        element: version.data.element,
        location: version.data.location,
        userProperties: version.data.userProperties,
      };
    };

    return {
      id: data.flow.id,
      name: data.flow.name,
      description: data.flow.description,
      created_at: data.flow.created_at,
      updated_at: data.flow.updated_at,
      enabled_at: data.flow.enabled_at,
      project_id: data.flow.project_id,
      flow_type: data.flow.flow_type,
      human_id: data.flow.human_id,
      draftVersion: createFlowVersionDto(data.draftFlowVersion),
      publishedVersion: createFlowVersionDto(data.publishedFlowVersion),
      preview_url: data.flow.preview_url,
      preview_stats: stats,
    };
  }

  async getFlowAnalytics({
    auth,
    flowId,
    startDate,
    endDate,
  }: {
    auth: Auth;
    flowId: string;
    /**
     * default 30 days ago
     */
    startDate?: Date;
    /**
     * default now
     */
    endDate?: Date;
  }): Promise<GetFlowAnalyticsDto> {
    await this.dbPermissionService.doesUserHaveAccessToFlow({ auth, flowId });

    // TODO: @pesickadavid distinct on large table is slow, we should separate event types to item list table and use that instead
    const eventTypes = this.databaseService.db
      .$with("event_types")
      .as(this.databaseService.db.selectDistinct({ type: events.type }).from(events));

    const sD = startDate
      ? dayjs(startDate).format("YYYY-MM-DD")
      : dayjs(startDate).subtract(30, "day").format("YYYY-MM-DD");
    const eD = dayjs(endDate).format("YYYY-MM-DD");

    const flowEvents = this.databaseService.db.$with("flow_events").as(
      this.databaseService.db
        .select({
          date: sql`date_trunc('day', ${events.event_time})`.as("date"),
          count: sql`cast(count(${events.id}) as int)`.as("count"),
          type: events.type,
        })
        .from(events)
        .where(
          and(
            eq(events.flow_id, flowId),
            gte(events.event_time, sql`${sD}`),
            lte(events.event_time, sql`${eD}`),
          ),
        )
        .groupBy((row) => [row.date, row.type]),
    );

    const calendarTable = sql`generate_series( ${sD}, ${eD}, '1 day'::interval) cal`;

    const dailyStatsQuery = this.databaseService.db
      .with(eventTypes, flowEvents)
      .select({
        date: sql<Date>`date_trunc('day', cal)`,
        count: sql<number>`coalesce(${flowEvents.count}, 0)`,
        type: sql<string>`${eventTypes.type}`,
      })
      .from(calendarTable)
      .fullJoin(eventTypes, sql`true`)
      .leftJoin(flowEvents, (row) =>
        and(eq(flowEvents.date, row.date), eq(eventTypes.type, flowEvents.type)),
      );

    const eventUsers = this.databaseService.db.$with("event_users").as(
      this.databaseService.db
        .select({ date: sql`date_trunc('day', ${events.event_time})`.as("date") })
        .from(events)
        .where(
          and(eq(events.flow_id, flowId), gt(events.event_time, sql`now() - interval '30 day'`)),
        )
        .groupBy((row) => [row.date, events.user_hash]),
    );

    const uniqueUsersQuery = this.databaseService.db
      .with(eventUsers)
      .select({
        date: sql<Date>`date_trunc('day', cal)`,
        count: sql<number>`cast(count(${eventUsers.date}) as int)`,
      })
      .from(calendarTable)
      .leftJoin(eventUsers, (row) => eq(eventUsers.date, row.date))
      .groupBy((row) => row.date)
      .orderBy((row) => row.date);

    const [dailyStats, uniqueUsers] = await Promise.all([dailyStatsQuery, uniqueUsersQuery]);
    return {
      daily_stats: [...dailyStats, ...uniqueUsers.map((row) => ({ ...row, type: "uniqueUsers" }))],
    };
  }

  async updateFlow({
    auth,
    data,
    flowId,
  }: {
    auth: Auth;
    flowId: string;
    data: UpdateFlowDto;
  }): Promise<void> {
    await this.dbPermissionService.doesUserHaveAccessToFlow({ auth, flowId });

    const flow = await this.databaseService.db.query.flows.findFirst({
      where: eq(flows.id, flowId),
      with: {
        draftVersion: true,
        publishedVersion: true,
      },
    });
    if (!flow) throw new NotFoundException();

    const currentVersion = flow.draftVersion ?? flow.publishedVersion;
    const updatedVersionData = {
      frequency: data.frequency ?? currentVersion?.frequency,
      data: {
        steps: data.steps ?? currentVersion?.data.steps ?? [],
        element: data.element ?? currentVersion?.data.element,
        location: data.location ?? currentVersion?.data.location,
        userProperties: data.userProperties ?? currentVersion?.data.userProperties ?? [],
      },
    };
    const versionDataChanged =
      JSON.stringify(updatedVersionData) !== JSON.stringify(currentVersion);

    const currentDrafts = await (() => {
      if (!versionDataChanged) return;
      if (flow.draft_version_id)
        return this.databaseService.db
          .update(flowVersions)
          .set({
            ...updatedVersionData,
            updated_at: new Date(),
          })
          .where(eq(flowVersions.id, flow.draft_version_id))
          .returning({ id: flowVersions.id });
      return this.databaseService.db
        .insert(flowVersions)
        .values({
          ...updatedVersionData,
          flow_id: flowId,
        })
        .returning({ id: flowVersions.id });
    })();
    const currentDraftVersionId = currentDrafts?.at(0)?.id;
    if (versionDataChanged && !currentDraftVersionId)
      throw new BadRequestException("Failed to update data");

    const enabled_at = (() => {
      if (data.enabled === undefined) return undefined;
      if (flow.enabled_at && data.enabled) return undefined;
      if (!flow.enabled_at && data.enabled) return new Date();
      if (flow.enabled_at && !data.enabled) return null;
    })();

    await this.databaseService.db
      .update(flows)
      .set({
        name: data.name,
        description: data.description,
        human_id: data.human_id,
        updated_at: new Date(),
        enabled_at,
        draft_version_id: currentDraftVersionId,
        preview_url: data.preview_url,
      })
      .where(eq(flows.id, flowId));
  }

  async publishFlow({ auth, flowId }: { auth: Auth; flowId: string }): Promise<void> {
    await this.dbPermissionService.doesUserHaveAccessToFlow({ auth, flowId });

    const flow = await this.databaseService.db.query.flows.findFirst({
      where: eq(flows.id, flowId),
    });
    if (!flow) throw new NotFoundException();

    if (!flow.draft_version_id) throw new BadRequestException("No draft version found");

    const updateVersionQuery = this.databaseService.db
      .update(flowVersions)
      .set({ published_at: new Date() })
      .where(eq(flowVersions.id, flow.draft_version_id));

    const updateFlowQuery = this.databaseService.db
      .update(flows)
      .set({
        draft_version_id: null,
        published_version_id: flow.draft_version_id,
      })
      .where(eq(flows.id, flowId));

    await Promise.all([updateVersionQuery, updateFlowQuery]);
  }

  async createFlow({
    auth,
    data,
    projectId,
  }: {
    auth: Auth;
    projectId: string;
    data: CreateFlowDto;
  }): Promise<GetFlowsDto> {
    await this.dbPermissionService.doesUserHaveAccessToProject({ auth, projectId });

    const newFlows = await this.databaseService.db
      .insert(flows)
      .values({
        name: data.name,
        description: "",
        project_id: projectId,
        flow_type: "cloud",
        human_id: slugify(data.name, { lower: true, strict: true }),
      })
      .returning();
    const flow = newFlows.at(0);
    if (!flow) throw new BadRequestException("failed to create flow");

    return {
      id: flow.id,
      name: flow.name,
      description: flow.description,
      created_at: flow.created_at,
      updated_at: flow.updated_at,
      enabled_at: flow.enabled_at,
      project_id: flow.project_id,
      flow_type: flow.flow_type,
      human_id: flow.human_id,
      preview_url: flow.preview_url,
    };
  }

  async deleteFlow({ auth, flowId }: { auth: Auth; flowId: string }): Promise<void> {
    await this.dbPermissionService.doesUserHaveAccessToFlow({ auth, flowId });

    await this.databaseService.db.delete(flows).where(eq(flows.id, flowId));
  }

  async getFlowVersions({
    auth,
    flowId,
  }: {
    auth: Auth;
    flowId: string;
  }): Promise<GetFlowVersionsDto[]> {
    await this.dbPermissionService.doesUserHaveAccessToFlow({ auth, flowId });

    const versions = await this.databaseService.db.query.flowVersions.findMany({
      where: eq(flowVersions.flow_id, flowId),
      orderBy: [desc(flowVersions.created_at)],
    });

    return versions.map((version) => ({
      id: version.id,
      created_at: version.created_at,
      data: version.data,
      frequency: version.frequency,
    }));
  }
}
