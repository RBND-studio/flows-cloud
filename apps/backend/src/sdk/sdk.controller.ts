import { Body, Controller, Delete, Get, Header, Headers, Param, Post, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { minutes, Throttle } from "@nestjs/throttler";

import type { CreateEventResponseDto, GetSdkFlowsDto } from "./sdk.dto";
import { CreateEventDto } from "./sdk.dto";
import { SdkService } from "./sdk.service";

@ApiTags("sdk")
@Controller("sdk")
export class SdkController {
  constructor(private sdkService: SdkService) {}

  @Get("css")
  @Throttle({ default: { limit: 100, ttl: minutes(1) } })
  @Header("content-type", "text/css")
  @Header("cache-control", "max-age=3600")
  getCss(@Query("projectId") projectId: string, @Query("v") version: string): Promise<string> {
    return this.sdkService.getCss({ projectId, version });
  }

  @Get("flows")
  @Throttle({ default: { limit: 50, ttl: minutes(1) } })
  @ApiQuery({ name: "userHash", required: false })
  getFlows(
    @Headers("origin") origin: string,
    @Query("projectId") projectId: string,
    @Query("userHash") userHash?: string,
  ): Promise<GetSdkFlowsDto[]> {
    return this.sdkService.getFlows({ projectId, requestOrigin: origin, userHash });
  }

  @Get("flows/:flowId/draft")
  @Throttle({ default: { limit: 50, ttl: minutes(1) } })
  getPreviewFlow(
    @Headers("origin") origin: string,
    @Query("projectId") projectId: string,
    @Param("flowId") flowId: string,
  ): Promise<GetSdkFlowsDto> {
    return this.sdkService.getPreviewFlow({ projectId, requestOrigin: origin, flowId });
  }

  @Get("flows/:flowId")
  @Throttle({ default: { limit: 50, ttl: minutes(1) } })
  getFlowDetail(
    @Headers("origin") origin: string,
    @Query("projectId") projectId: string,
    @Param("flowId") flowId: string,
  ): Promise<GetSdkFlowsDto> {
    return this.sdkService.getFlowDetail({ projectId, requestOrigin: origin, flowId });
  }

  @Post("events")
  createEvent(
    @Headers("origin") origin: string,
    @Body() createEventDto: CreateEventDto,
  ): Promise<CreateEventResponseDto> {
    return this.sdkService.createEvent({ event: createEventDto, requestOrigin: origin });
  }

  @Delete("events/:eventId")
  deleteEvent(@Headers("origin") origin: string, @Param("eventId") eventId: string): Promise<void> {
    return this.sdkService.deleteEvent({ eventId, requestOrigin: origin });
  }
}
