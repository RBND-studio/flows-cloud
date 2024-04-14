import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { flows, organizationsToUsers, projects, subscriptions } from "db";
import { and, arrayContains, eq } from "drizzle-orm";

import type { Auth } from "../auth";
import { DatabaseService } from "../database/database.service";
import { isLocalhost } from "../lib/origin";

@Injectable()
export class DbPermissionService {
  constructor(private databaseService: DatabaseService) {}

  async doesUserHaveAccessToOrganization({
    auth,
    organizationId,
  }: {
    auth: Auth;
    organizationId: string;
  }): Promise<boolean> {
    const results = await this.databaseService.db
      .select({
        organizationToUser: organizationsToUsers,
      })
      .from(organizationsToUsers)
      .where(
        and(
          eq(organizationsToUsers.organization_id, organizationId),
          eq(organizationsToUsers.user_id, auth.userId),
        ),
      )
      .limit(1);

    const data = results.at(0);
    if (!data?.organizationToUser) throw new ForbiddenException();

    return true;
  }

  async doesUserHaveAccessToProject({
    auth,
    projectId,
  }: {
    auth: Auth;
    projectId: string;
  }): Promise<boolean> {
    const results = await this.databaseService.db
      .select({
        projectId: projects.id,
        organizationToUser: organizationsToUsers,
      })
      .from(projects)
      .leftJoin(
        organizationsToUsers,
        and(
          eq(projects.organization_id, organizationsToUsers.organization_id),
          eq(organizationsToUsers.user_id, auth.userId),
        ),
      )
      .where(eq(projects.id, projectId));

    const data = results.at(0);
    if (!data?.projectId) throw new NotFoundException();
    if (!data.organizationToUser) throw new ForbiddenException();

    return true;
  }

  async doesUserHaveAccessToFlow({
    auth,
    flowId,
  }: {
    auth: Auth;
    flowId: string;
  }): Promise<boolean> {
    const results = await this.databaseService.db
      .select({
        flowId: flows.id,
        projectId: projects.id,
        organizationToUser: organizationsToUsers,
      })
      .from(flows)
      .leftJoin(projects, eq(flows.project_id, projects.id))
      .leftJoin(
        organizationsToUsers,
        and(
          eq(projects.organization_id, organizationsToUsers.organization_id),
          eq(organizationsToUsers.user_id, auth.userId),
        ),
      )
      .where(eq(flows.id, flowId));

    const data = results.at(0);

    if (!data?.projectId || !data.flowId) throw new NotFoundException();
    if (!data.organizationToUser) throw new ForbiddenException();

    return true;
  }

  async doesUserHaveAccessToSubscription({
    auth,
    subscriptionId,
  }: {
    auth: Auth;
    subscriptionId: string;
  }): Promise<boolean> {
    const results = await this.databaseService.db
      .select({
        subscriptionId: subscriptions.id,
        organizationToUser: organizationsToUsers,
      })
      .from(subscriptions)
      .leftJoin(
        organizationsToUsers,
        and(
          eq(subscriptions.organization_id, organizationsToUsers.organization_id),
          eq(organizationsToUsers.user_id, auth.userId),
        ),
      )
      .where(eq(subscriptions.id, subscriptionId));

    const data = results.at(0);
    if (!data?.subscriptionId) throw new NotFoundException();
    if (!data.organizationToUser) throw new ForbiddenException();

    return true;
  }

  async isAllowedOrigin({
    projectId,
    requestOrigin,
  }: {
    projectId: string;
    requestOrigin: string;
  }): Promise<void> {
    if (!projectId || !requestOrigin) throw new BadRequestException();

    const projectsWhere = isLocalhost(requestOrigin)
      ? eq(projects.id, projectId)
      : and(eq(projects.id, projectId), arrayContains(projects.domains, [requestOrigin]));

    const project = await this.databaseService.db.query.projects.findFirst({
      where: projectsWhere,
      columns: { id: true },
    });

    if (!project) throw new BadRequestException();
  }
}
