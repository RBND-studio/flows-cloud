import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { type Auth, Authorization } from "../auth";
import { UUIDParam } from "../lib/uuid";
import type { GetProjectDetailDto, GetProjectsDto } from "./projects.dto";
import { CreateProjectDto, UpdateProjectDto } from "./projects.dto";
import { ProjectsService } from "./projects.service";

@ApiTags("projects")
@ApiBearerAuth()
@Controller()
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get("organizations/:organizationId/projects")
  getProjects(
    @Authorization() auth: Auth,
    @UUIDParam("organizationId") organizationId: string,
  ): Promise<GetProjectsDto[]> {
    return this.projectsService.getProjects({ auth, organizationId });
  }

  @Get("projects/:projectId")
  getProjectDetail(
    @Authorization() auth: Auth,
    @UUIDParam("projectId") projectId: string,
  ): Promise<GetProjectDetailDto> {
    return this.projectsService.getProjectDetail({ auth, projectId });
  }

  @Post("organizations/:organizationId/projects")
  createProject(
    @Authorization() auth: Auth,
    @UUIDParam("organizationId") organizationId: string,
    @Body() body: CreateProjectDto,
  ): Promise<GetProjectsDto> {
    return this.projectsService.createProject({ auth, organizationId, data: body });
  }

  @Patch("projects/:projectId")
  updateProject(
    @Authorization() auth: Auth,
    @UUIDParam("projectId") projectId: string,
    @Body() body: UpdateProjectDto,
  ): Promise<GetProjectDetailDto> {
    return this.projectsService.updateProject({ auth, projectId, data: body });
  }

  @Delete("projects/:projectId")
  deleteProject(
    @Authorization() auth: Auth,
    @UUIDParam("projectId") projectId: string,
  ): Promise<void> {
    return this.projectsService.deleteProject({ auth, projectId });
  }
}
