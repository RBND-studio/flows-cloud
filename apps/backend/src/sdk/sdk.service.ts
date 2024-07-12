import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import browserslist from "browserslist";
import { events, flows, flowUserProgresses, organizations, projects, subscriptions } from "db";
import { and, eq, inArray, isNotNull } from "drizzle-orm";
import { browserslistToTargets, transform } from "lightningcss";

import { DatabaseService } from "../database/database.service";
import { DbPermissionService } from "../db-permission/db-permission.service";
import { LemonSqueezyService } from "../lemon-squeezy/lemon-squeezy.service";
import { getDefaultCssMinTemplate, getDefaultCssMinVars } from "../lib/css";
import { isLocalhost } from "../lib/origin";
import { TooManyRequestsException } from "../lib/too-many-requests-exception";
import { OrganizationUsageService } from "../organization-usage/organization-usage.service";
import type {
  CreateEventDto,
  CreateEventResponseDto,
  GetSdkFlowsDto,
  GetSdkFlowsV2Dto,
} from "./sdk.dto";

@Injectable()
export class SdkService {
  private readonly logger = new Logger(SdkService.name);

  constructor(
    private databaseService: DatabaseService,
    private dbPermissionService: DbPermissionService,
    private organizationUsageService: OrganizationUsageService,
    private lemonSqueezyService: LemonSqueezyService,
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
      this.logger.error("Failed to transform CSS for project", projectId);
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
  }): Promise<GetSdkFlowsV2Dto> {
    await this.dbPermissionService.isAllowedOrigin({ projectId, requestOrigin });

    const limitReached = await this.organizationUsageService.getIsOrganizationLimitReachedByProject(
      { projectId },
    );
    if (limitReached && !isLocalhost(requestOrigin))
      throw new TooManyRequestsException("Organization limit reached");

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
      if (!userHash || !dbFlows.length) return;

      return this.databaseService.db.query.flowUserProgresses.findMany({
        columns: { flow_id: true },
        where: and(
          eq(flowUserProgresses.user_hash, userHash),
          inArray(
            flowUserProgresses.flow_id,
            dbFlows.map((f) => f.id),
          ),
        ),
      });
    })();

    const seenEventsByFlowId = new Map(seenEvents?.map((e) => [e.flow_id, e]));

    const results = dbFlows
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
          start: f.publishedVersion.data.start,
          userProperties: f.publishedVersion.data.userProperties,
          steps: steps.slice(0, 1),
          _incompleteSteps,
        };
      });

    const error_message = limitReached
      ? "Organization limit reached, your flows will be loaded because you are on localhost."
      : undefined;

    return { results, error_message };
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

    const flow = await this.databaseService.db.query.flows.findFirst({
      where: and(
        eq(flows.project_id, projectId),
        eq(flows.flow_type, "cloud"),
        eq(flows.human_id, flowId),
        isNotNull(flows.enabled_at),
      ),
      with: { publishedVersion: true },
    });
    if (!flow) throw new NotFoundException();
    if (!flow.publishedVersion) throw new BadRequestException();

    const data = flow.publishedVersion.data;
    return {
      id: flow.human_id,
      steps: data.steps,
      start: data.start,
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
    if (!version) throw new BadRequestException();

    const data = version.data;
    return {
      id: flow.human_id,
      steps: data.steps,
      start: data.start,
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

    const existingFlow = await this.databaseService.db.query.flows.findFirst({
      columns: { flow_type: true, id: true },
      where: and(eq(flows.project_id, projectId), eq(flows.human_id, event.flowId)),
    });

    if (!existingFlow || existingFlow.flow_type === "local") {
      const limitReached =
        await this.organizationUsageService.getIsOrganizationLimitReachedByProject({ projectId });
      if (limitReached) throw new BadRequestException("Organization limit reached");
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
        .returning({ id: flows.id });
      const newFlow = newFlows.at(0);
      if (!newFlow) throw new InternalServerErrorException("error creating flow");
      return newFlow;
    })();

    if (event.userHash && (event.type === "cancelFlow" || event.type === "finishFlow")) {
      await this.databaseService.db
        .insert(flowUserProgresses)
        .values({
          flow_id: flow.id,
          user_hash: event.userHash,
        })
        .onConflictDoUpdate({
          target: [flowUserProgresses.flow_id, flowUserProgresses.user_hash],
          set: { updated_at: new Date() },
        });
    }

    if (isLocalhost(requestOrigin)) return {};

    // For startFlow event, we need to send usage record to LemonSqueezy if the organization has subscription
    if (event.type === "startFlow") {
      void this.databaseService.db
        .select({ subscription_item_id: subscriptions.subscription_item_id })
        .from(subscriptions)
        .leftJoin(organizations, eq(subscriptions.organization_id, organizations.id))
        .leftJoin(projects, eq(projects.organization_id, organizations.id))
        .where(
          and(eq(projects.id, projectId), inArray(subscriptions.status, ["active", "past_due"])),
        )
        .then(async (subscriptionsResult) => {
          const subscriptionItemId = subscriptionsResult.at(0)?.subscription_item_id;
          if (subscriptionItemId === undefined) return;
          const res = await this.lemonSqueezyService.createUsageRecord({
            quantity: 1,
            action: "increment",
            subscriptionItemId,
          });
          if (res.error) throw new InternalServerErrorException("Failed to create usage record");
        });
    }

    const createdEvents = await this.databaseService.db
      .insert(events)
      .values({
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
      })
      .returning({ id: events.id });

    const createdEvent = createdEvents.at(0);
    if (!createdEvent) throw new InternalServerErrorException("error saving event");
    return createdEvent;
  }

  async deleteEvent({
    eventId: requestEventId,
    requestOrigin,
  }: {
    requestOrigin: string;
    eventId: string;
  }): Promise<void> {
    if (isLocalhost(requestOrigin)) return;

    const results = await this.databaseService.db
      .select({
        projectId: flows.project_id,
        eventId: events.id,
        eventTime: events.event_time,
        eventType: events.event_type,
      })
      .from(events)
      .leftJoin(flows, eq(events.flow_id, flows.id))
      .where(eq(events.id, requestEventId));

    const result = results.at(0);
    if (!result?.eventId) throw new NotFoundException();
    const { projectId } = result;
    if (!projectId) throw new InternalServerErrorException();

    await this.dbPermissionService.isAllowedOrigin({ projectId, requestOrigin });

    const eventIsMoreThen15MinutesOld = result.eventTime < new Date(Date.now() - 15 * 60 * 1000);
    if (result.eventType !== "tooltipError" || eventIsMoreThen15MinutesOld)
      throw new BadRequestException();

    await this.databaseService.db.delete(events).where(eq(events.id, result.eventId));
  }

  async deleteUserProgress({
    projectId,
    userHash,
    flowId,
  }: {
    userHash: string;
    projectId: string;
    flowId?: string;
  }): Promise<void> {
    const eqProjectId = eq(flows.project_id, projectId);

    const flowIds = await this.databaseService.db.query.flows.findMany({
      columns: { id: true },
      where: flowId ? and(eqProjectId, eq(flows.human_id, flowId)) : eqProjectId,
    });

    if (!flowIds.length) return;

    await this.databaseService.db.delete(flowUserProgresses).where(
      and(
        inArray(
          flowUserProgresses.flow_id,
          flowIds.map((f) => f.id),
        ),
        eq(flowUserProgresses.user_hash, userHash),
      ),
    );
  }
}
