import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { organizations, organizationsToUsers, projects } from "db";
import { asc, eq } from "drizzle-orm";

import type { Auth } from "../auth";
import { DatabaseService } from "../database/database.service";
import { DbPermissionService } from "../db-permission/db-permission.service";
import type {
  CreateProjectDto,
  GetProjectDetailDto,
  GetProjectsDto,
  UpdateProjectDto,
} from "./projects.dto";

@Injectable()
export class ProjectsService {
  constructor(
    private databaseService: DatabaseService,
    private dbPermissionService: DbPermissionService,
  ) {}

  async getProjects({
    auth,
    organizationId,
  }: {
    organizationId: string;
    auth: Auth;
  }): Promise<GetProjectsDto[]> {
    await this.dbPermissionService.doesUserHaveAccessToOrganization({ auth, organizationId });

    const orgProjects = await this.databaseService.db.query.projects.findMany({
      where: eq(projects.organization_id, organizationId),
      orderBy: [asc(projects.name)],
      columns: {
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
        organization_id: true,
      },
    });

    return orgProjects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      created_at: project.created_at,
      updated_at: project.updated_at,
      organization_id: project.organization_id,
    }));
  }

  async getProjectDetail({
    auth,
    projectId,
  }: {
    auth: Auth;
    projectId: string;
  }): Promise<GetProjectDetailDto> {
    const project = await this.databaseService.db.query.projects.findFirst({
      where: eq(projects.id, projectId),
    });
    if (!project) throw new NotFoundException();
    const org = await this.databaseService.db.query.organizations.findFirst({
      where: eq(organizations.id, project.organization_id),
      with: {
        organizationsToUsers: {
          where: eq(organizationsToUsers.user_id, auth.userId),
        },
      },
    });
    const userHasAccessToOrg = !!org?.organizationsToUsers.length;
    if (!userHasAccessToOrg) throw new ForbiddenException();

    return {
      id: project.id,
      name: project.name,
      description: project.description,
      created_at: project.created_at,
      updated_at: project.updated_at,
      organization_id: project.organization_id,
      domains: project.domains,
      css_vars: project.css_vars ?? undefined,
      css_template: project.css_template ?? undefined,
    };
  }

  async createProject({
    auth,
    data,
    organizationId,
  }: {
    auth: Auth;
    organizationId: string;
    data: CreateProjectDto;
  }): Promise<GetProjectsDto> {
    await this.dbPermissionService.doesUserHaveAccessToOrganization({ auth, organizationId });

    const newProjects = await this.databaseService.db
      .insert(projects)
      .values({
        name: data.name,
        organization_id: organizationId,
        domains: data.domains ?? [],
      })
      .returning();
    const project = newProjects.at(0);
    if (!project) throw new BadRequestException("Failed to create project");

    return {
      id: project.id,
      name: project.name,
      description: project.description,
      created_at: project.created_at,
      updated_at: project.updated_at,
      organization_id: project.organization_id,
    };
  }

  async updateProject({
    auth,
    data,
    projectId,
  }: {
    auth: Auth;
    projectId: string;
    data: UpdateProjectDto;
  }): Promise<GetProjectDetailDto> {
    await this.dbPermissionService.doesUserHaveAccessToProject({ auth, projectId });

    const updatedProjects = await this.databaseService.db
      .update(projects)
      .set({
        updated_at: new Date(),
        description: data.description,
        domains: data.domains,
        name: data.name,
        css_vars: data.css_vars?.trim(),
        css_template: data.css_template?.trim(),
      })
      .where(eq(projects.id, projectId))
      .returning();
    const updatedProj = updatedProjects.at(0);
    if (!updatedProj) throw new BadRequestException("Failed to update project");

    return {
      id: updatedProj.id,
      name: updatedProj.name,
      description: updatedProj.description,
      created_at: updatedProj.created_at,
      updated_at: updatedProj.updated_at,
      organization_id: updatedProj.organization_id,
      domains: updatedProj.domains,
      css_vars: updatedProj.css_vars ?? undefined,
      css_template: updatedProj.css_template ?? undefined,
    };
  }

  async deleteProject({ auth, projectId }: { auth: Auth; projectId: string }): Promise<void> {
    await this.dbPermissionService.doesUserHaveAccessToProject({ auth, projectId });

    await this.databaseService.db.delete(projects).where(eq(projects.id, projectId));
  }
}
