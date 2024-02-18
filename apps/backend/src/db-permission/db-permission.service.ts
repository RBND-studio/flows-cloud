import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { flows, organizations, organizationsToUsers, projects } from "db";
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
    const complexQuery = await this.databaseService.db
      .select({
        organizationId: organizations.id,
        organizationToUser: organizationsToUsers,
      })
      .from(organizations)
      .leftJoin(
        organizationsToUsers,
        and(
          eq(organizations.id, organizationsToUsers.organization_id),
          eq(organizationsToUsers.user_id, auth.userId),
        ),
      )
      .where(eq(organizations.id, organizationId));

    if (!complexQuery.length) throw new NotFoundException();
    const data = complexQuery[0];
    if (!data.organizationToUser) throw new ForbiddenException();

    return true;
  }

  async doesUserHaveAccessToProject({
    auth,
    projectId,
  }: {
    auth: Auth;
    projectId: string;
  }): Promise<boolean> {
    const complexQuery = await this.databaseService.db
      .select({
        projectId: projects.id,
        organizationId: organizations.id,
        organizationToUser: organizationsToUsers,
      })
      .from(projects)
      .leftJoin(organizations, eq(projects.organization_id, organizations.id))
      .leftJoin(
        organizationsToUsers,
        and(
          eq(organizations.id, organizationsToUsers.organization_id),
          eq(organizationsToUsers.user_id, auth.userId),
        ),
      )
      .where(eq(projects.id, projectId));

    if (!complexQuery.length) throw new NotFoundException();
    const data = complexQuery[0];
    if (!data.organizationId) throw new NotFoundException();
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
    const complexQuery = await this.databaseService.db
      .select({
        flowId: flows.id,
        projectId: projects.id,
        organizationId: organizations.id,
        organizationToUser: organizationsToUsers,
      })
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
      .where(eq(flows.id, flowId));

    if (!complexQuery.length) throw new NotFoundException();
    const data = complexQuery[0];
    if (!data.projectId) throw new NotFoundException();
    if (!data.organizationId) throw new NotFoundException();
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
    if (!projectId || !requestOrigin) throw new NotFoundException();
    if (isLocalhost(requestOrigin)) return;

    const projectsWhere = isLocalhost(requestOrigin)
      ? eq(projects.id, projectId)
      : and(eq(projects.id, projectId), arrayContains(projects.domains, [requestOrigin]));

    const project = await this.databaseService.db.query.projects.findFirst({
      where: projectsWhere,
      columns: { id: true },
    });

    if (!project) throw new NotFoundException();
  }
}
