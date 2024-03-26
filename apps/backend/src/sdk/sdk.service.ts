import { createUsageRecord } from "@lemonsqueezy/lemonsqueezy.js";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import browserslist from "browserslist";
import { events, flows, organizations, projects, subscriptions } from "db";
import { and, arrayContains, desc, eq, inArray, isNotNull } from "drizzle-orm";
import { browserslistToTargets, transform } from "lightningcss";

import { DatabaseService } from "../database/database.service";
import { DbPermissionService } from "../db-permission/db-permission.service";
import { getDefaultCssMinTemplate, getDefaultCssMinVars } from "../lib/css";
import { configureLemonSqueezy } from "../lib/lemon-squeezy";
import { getIsOrganizationLimitReachedByProject } from "../lib/organization";
import { isLocalhost } from "../lib/origin";
import type { CreateEventDto, CreateEventResponseDto, GetSdkFlowsDto } from "./sdk.dto";

@Injectable()
export class SdkService {
  constructor(
    private databaseService: DatabaseService,
    private dbPermissionService: DbPermissionService,
  ) {}

  async getCss({ projectId, version }: { projectId: string; version?: string }): Promise<string> {
    if (!projectId) throw new NotFoundException();

    const project = await this.databaseService.db.query.projects.findFirst({
      where: eq(projects.id, projectId),
      columns: {
        css_vars: true,
        css_template: true,
      },
    });
    if (!project) throw new NotFoundException();

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- or is intended here
    const css_vars = project.css_vars?.trim() || getDefaultCssMinVars(version);
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- or is intended here
    const css_template = project.css_template?.trim() || getDefaultCssMinTemplate(version);
    const css = (await Promise.all([css_vars, css_template])).join("\n");

    try {
      const minified = transform({
        filename: "template.css",
        code: Buffer.from(css),
        minify: true,
        targets: browserslistToTargets(browserslist(">= 0.25%")),
      });
      return minified.code.toString();
    } catch {
      return css;
    }
  }

  async getFlows({
    projectId,
    requestOrigin,
    userHash,
  }: {
    projectId: string;
    requestOrigin: string;
    userHash?: string;
  }): Promise<GetSdkFlowsDto[]> {
    await this.dbPermissionService.isAllowedOrigin({ projectId, requestOrigin });

    const limitReached = await getIsOrganizationLimitReachedByProject({
      databaseService: this.databaseService,
      projectId,
    });
    if (limitReached) return [];

    const dbFlows = await this.databaseService.db.query.flows.findMany({
      where: and(
        eq(flows.project_id, projectId),
        eq(flows.flow_type, "cloud"),
        isNotNull(flows.enabled_at),
      ),
      with: {
        publishedVersion: true,
      },
    });

    const seenEvents = await (() => {
      if (!userHash) return;
      return this.databaseService.db
        .selectDistinctOn([events.flow_id], {
          flow_id: events.flow_id,
          event_time: events.event_time,
        })
        .from(events)
        .where(
          and(
            eq(events.user_hash, userHash),
            inArray(events.event_type, ["finishFlow", "cancelFlow"]),
            inArray(
              events.flow_id,
              dbFlows.map((f) => f.id),
            ),
          ),
        )
        .groupBy(events.flow_id, events.event_time)
        .orderBy(events.flow_id, desc(events.event_time));
    })();

    const seenEventsByFlowId = new Map(seenEvents?.map((e) => [e.flow_id, e]));

    return dbFlows
      .filter((flow) => {
        if (!userHash) return true;
        if (flow.publishedVersion?.frequency === "every-time") return true;
        const event = seenEventsByFlowId.get(flow.id);
        if (flow.publishedVersion?.frequency === "once" && event) return false;
        return true;
      })
      .flatMap((f) => {
        if (!f.publishedVersion) return [];
        const steps = f.publishedVersion.data.steps;
        const _incompleteSteps = steps.length > 1 ? true : undefined;
        return {
          id: f.human_id,
          frequency: f.publishedVersion.frequency,
          clickElement: f.publishedVersion.data.clickElement,
          location: f.publishedVersion.data.location,
          userProperties: f.publishedVersion.data.userProperties,
          steps: steps.slice(0, 1),
          _incompleteSteps,
        };
      });
  }

  async getFlowDetail({
    flowId,
    projectId,
    requestOrigin,
  }: {
    requestOrigin: string;
    projectId: string;
    flowId: string;
  }): Promise<GetSdkFlowsDto> {
    if (!flowId) throw new NotFoundException();
    await this.dbPermissionService.isAllowedOrigin({ projectId, requestOrigin });

    const limitReached = await getIsOrganizationLimitReachedByProject({
      databaseService: this.databaseService,
      projectId,
    });
    if (limitReached) throw new NotFoundException("Organization limit reached");

    const flow = await this.databaseService.db.query.flows.findFirst({
      where: and(
        eq(flows.project_id, projectId),
        eq(flows.flow_type, "cloud"),
        eq(flows.human_id, flowId),
        isNotNull(flows.enabled_at),
      ),
      with: { publishedVersion: true },
    });
    if (!flow?.publishedVersion) throw new NotFoundException();
    const data = flow.publishedVersion.data;
    return {
      id: flow.human_id,
      steps: data.steps,
      clickElement: data.clickElement,
      location: data.location,
      userProperties: data.userProperties,
      frequency: flow.publishedVersion.frequency,
    };
  }

  async getPreviewFlow({
    flowId,
    projectId,
    requestOrigin,
  }: {
    requestOrigin: string;
    projectId: string;
    flowId: string;
  }): Promise<GetSdkFlowsDto> {
    if (!flowId) throw new NotFoundException();
    await this.dbPermissionService.isAllowedOrigin({ projectId, requestOrigin });

    const flow = await this.databaseService.db.query.flows.findFirst({
      where: and(
        eq(flows.project_id, projectId),
        eq(flows.flow_type, "cloud"),
        eq(flows.human_id, flowId),
      ),
      with: {
        draftVersion: true,
        publishedVersion: true,
      },
    });
    if (!flow) throw new NotFoundException();

    const version = flow.draftVersion ?? flow.publishedVersion;
    if (!version) throw new NotFoundException();

    const data = version.data;
    return {
      id: flow.human_id,
      steps: data.steps,
      clickElement: data.clickElement,
      location: data.location,
      userProperties: data.userProperties,
      frequency: version.frequency,
    };
  }

  async createEvent({
    event,
    requestOrigin,
  }: {
    event: CreateEventDto;
    requestOrigin: string;
  }): Promise<CreateEventResponseDto> {
    const projectId = event.projectId;
    await this.dbPermissionService.isAllowedOrigin({ projectId, requestOrigin });

    const limitReached = await getIsOrganizationLimitReachedByProject({
      databaseService: this.databaseService,
      projectId,
    });
    const existingFlow = await this.databaseService.db.query.flows.findFirst({
      where: and(eq(flows.project_id, projectId), eq(flows.human_id, event.flowId)),
    });
    if (limitReached && (!existingFlow || existingFlow.flow_type === "local"))
      throw new BadRequestException("Organization limit reached");

    // For startFlow event, we need to send usage record to LemonSqueezy if the organization has subscription
    if (event.type === "startFlow") {
      void this.databaseService.db
        .select({ subscription_item_id: subscriptions.subscription_item_id })
        .from(subscriptions)
        .leftJoin(organizations, eq(subscriptions.organization_id, organizations.id))
        .leftJoin(projects, eq(projects.organization_id, organizations.id))
        .where(eq(projects.id, projectId))
        .then(async (subscriptionsResult) => {
          const subscriptionItemId = subscriptionsResult.at(0)?.subscription_item_id;
          if (subscriptionItemId === undefined) return;
          configureLemonSqueezy();
          const res = await createUsageRecord({
            quantity: 1,
            action: "increment",
            subscriptionItemId,
          });
          if (res.error)
            // eslint-disable-next-line no-console -- useful
            console.error("Failed to create the usage record for the subscription", projectId);
        });
    }

    const flow = await (async () => {
      if (existingFlow) return existingFlow;
      const newFlows = await this.databaseService.db
        .insert(flows)
        .values({
          human_id: event.flowId,
          project_id: projectId,
          flow_type: "local",
          description: "",
          name: event.flowId,
        })
        .returning();
      const newFlow = newFlows.at(0);
      if (!newFlow) throw new BadRequestException("error creating flow");
      return newFlow;
    })();

    const newEvent: typeof events.$inferInsert = {
      event_time: event.eventTime,
      event_type: event.type,
      flow_id: flow.id,
      user_hash: event.userHash,
      step_index: event.stepIndex,
      flow_hash: event.flowHash,
      step_hash: event.stepHash,
      sdk_version: event.sdkVersion,
      target_element: event.targetElement,
      location: event.location,
    };

    const createdEvents = await this.databaseService.db
      .insert(events)
      .values(newEvent)
      .returning({ id: events.id });

    const createdEvent = createdEvents.at(0);
    if (!createdEvent) throw new BadRequestException("error saving event");
    return createdEvent;
  }

  async deleteEvent({
    eventId,
    requestOrigin,
  }: {
    requestOrigin: string;
    eventId: string;
  }): Promise<void> {
    if (!requestOrigin || !eventId) throw new NotFoundException();

    const projectsWhere = isLocalhost(requestOrigin)
      ? eq(flows.project_id, projects.id)
      : and(eq(flows.project_id, projects.id), arrayContains(projects.domains, [requestOrigin]));

    const query = await this.databaseService.db
      .select({ projectId: projects.id, flowId: flows.id, event: events })
      .from(events)
      .leftJoin(flows, eq(events.flow_id, flows.id))
      .leftJoin(projects, projectsWhere)
      .where(eq(events.id, eventId));
    const data = query.at(0);

    if (!data) throw new NotFoundException();
    const { event, flowId, projectId } = data;
    if (!flowId || !projectId) throw new NotFoundException();

    const eventIsMoreThen15MinutesOld = event.event_time < new Date(Date.now() - 15 * 60 * 1000);
    if (event.event_type !== "tooltipError" || eventIsMoreThen15MinutesOld)
      throw new NotFoundException();

    await this.databaseService.db.delete(events).where(eq(events.id, eventId));
  }
}
