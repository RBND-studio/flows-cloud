import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";

import { type Auth, Authorization } from "../auth";
import type {
  GetFlowAnalyticsDto,
  GetFlowDetailDto,
  GetFlowsDto,
  GetFlowVersionsDto,
} from "./flows.dto";
import { CreateFlowDto, UpdateFlowDto } from "./flows.dto";
import { FlowsService } from "./flows.service";

@ApiTags("flows")
@ApiBearerAuth()
@Controller()
export class FlowsController {
  constructor(private flowsService: FlowsService) {}

  @Get("projects/:projectId/flows")
  getFlows(
    @Authorization() auth: Auth,
    @Param("projectId") projectId: string,
  ): Promise<GetFlowsDto[]> {
    return this.flowsService.getFlows({ auth, projectId });
  }

  @Get("flows/:flowId")
  getFlowDetail(
    @Authorization() auth: Auth,
    @Param("flowId") flowId: string,
  ): Promise<GetFlowDetailDto> {
    return this.flowsService.getFlowDetail({ auth, flowId });
  }

  @Patch("flows/:flowId")
  async updateFlow(
    @Authorization() auth: Auth,
    @Param("flowId") flowId: string,
    @Body() body: UpdateFlowDto,
  ): Promise<void> {
    await this.flowsService.updateFlow({ auth, flowId, data: body });
  }

  @Post("flows/:flowId/publish")
  publishFlow(@Authorization() auth: Auth, @Param("flowId") flowId: string): Promise<void> {
    return this.flowsService.publishFlow({ auth, flowId });
  }

  @Post("projects/:projectId/flows")
  createFlow(
    @Authorization() auth: Auth,
    @Param("projectId") projectId: string,
    @Body() body: CreateFlowDto,
  ): Promise<GetFlowsDto> {
    return this.flowsService.createFlow({ auth, projectId, data: body });
  }

  @Delete("flows/:flowId")
  deleteFlow(@Authorization() auth: Auth, @Param("flowId") flowId: string): Promise<void> {
    return this.flowsService.deleteFlow({ auth, flowId });
  }

  @Get("flows/:flowId/versions")
  getFlowVersions(
    @Authorization() auth: Auth,
    @Param("flowId") flowId: string,
  ): Promise<GetFlowVersionsDto[]> {
    return this.flowsService.getFlowVersions({ auth, flowId });
  }

  @Get("flows/:flowId/analytics")
  @ApiQuery({ name: "startDate", required: false })
  @ApiQuery({ name: "endDate", required: false })
  getFlowAnalytics(
    @Authorization() auth: Auth,
    @Param("flowId") flowId: string,
    @Query("startDate") startDate?: Date,
    @Query("endDate") endDate?: Date,
  ): Promise<GetFlowAnalyticsDto> {
    return this.flowsService.getFlowAnalytics({ flowId, auth, startDate, endDate });
  }
}
