import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, IsUUID } from "class-validator";
import { EventType, EventTypeEnum, type FlowFrequency, FlowFrequencyEnum } from "db";

export class GetSdkFlowsDto {
  id: string;
  @ApiProperty({ enum: FlowFrequencyEnum, required: false })
  frequency: FlowFrequency | null;
  start: unknown[];
  steps: unknown[];
  userProperties?: unknown;
  _incompleteSteps?: boolean;
}

export class GetSdkFlowsV2Dto {
  results: GetSdkFlowsDto[];
  error_message?: string;
}

export class CreateEventDto {
  @Type(() => Date)
  @IsDate()
  eventTime: Date;

  @IsString()
  @IsOptional()
  userHash?: string;

  @IsString()
  flowId: string;

  @IsString()
  @IsUUID()
  projectId: string;

  @IsString()
  @IsOptional()
  stepIndex?: string;

  @IsString()
  @IsOptional()
  stepHash?: string;

  @IsString()
  flowHash: string;

  @IsString()
  sdkVersion: string;

  @IsString()
  @IsOptional()
  targetElement?: string;

  @IsString()
  location: string;

  @ApiProperty({ enum: EventTypeEnum })
  @IsString()
  type: EventType;
}

export class CreateEventResponseDto {
  id?: string;
}
