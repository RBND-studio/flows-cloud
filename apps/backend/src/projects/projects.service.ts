import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { flows, flowUserProgresses, projects } from "db";
import { and, asc, eq, inArray } from "drizzle-orm";

import type { Auth } from "../auth";
import { DatabaseService } from "../database/database.service";
import { DbPermissionService } from "../db-permission/db-permission.service";
import type {
  CreateProjectDto,
  DeleteProgressResponseDto,
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

    return this.databaseService.db.query.projects.findMany({
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
  }

  async getProjectDetail({
    auth,
    projectId,
  }: {
    auth: Auth;
    projectId: string;
  }): Promise<GetProjectDetailDto> {
    await this.dbPermissionService.doesUserHaveAccessToProject({ auth, projectId });

    const project = await this.databaseService.db.query.projects.findFirst({
      where: eq(projects.id, projectId),
      columns: {
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
        organization_id: true,
        domains: true,
        css_vars: true,
        css_template: true,
      },
    });

    if (!project) throw new InternalServerErrorException("Project not found");

    return project;
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
    if (!project) throw new InternalServerErrorException("Failed to create project");

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
      .returning({
        id: projects.id,
        name: projects.name,
        description: projects.description,
        created_at: projects.created_at,
        updated_at: projects.updated_at,
        organization_id: projects.organization_id,
        domains: projects.domains,
        css_vars: projects.css_vars,
        css_template: projects.css_template,
      });
    const updatedProj = updatedProjects.at(0);
    if (!updatedProj) throw new InternalServerErrorException("Failed to update project");

    return updatedProj;
  }

  async deleteProject({ auth, projectId }: { auth: Auth; projectId: string }): Promise<void> {
    await this.dbPermissionService.doesUserHaveAccessToProject({ auth, projectId });

    await this.databaseService.db.delete(projects).where(eq(projects.id, projectId));
  }

  async deleteUserProgress({
    auth,
    projectId,
    userHash,
    flowId,
  }: {
    auth: Auth;
    projectId: string;
    userHash: string;
    flowId?: string;
  }): Promise<DeleteProgressResponseDto> {
    await this.dbPermissionService.doesUserHaveAccessToProject({ auth, projectId });

    const flowIds = await (() => {
      if (flowId) return [flowId];

      return this.databaseService.db.query.flows
        .findMany({
          columns: { id: true },
          where: eq(flows.project_id, projectId),
        })
        .then((results) => results.map((f) => f.id));
    })();

    if (!flowIds.length) return { deletedCount: 0 };

    const deletedItems = await this.databaseService.db
      .delete(flowUserProgresses)
      .where(
        and(
          eq(flowUserProgresses.user_hash, userHash),
          inArray(flowUserProgresses.flow_id, flowIds),
        ),
      )
      .returning({});

    return { deletedCount: deletedItems.length };
  }
}
