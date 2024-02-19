import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";
import { EventType, EventTypeEnum, type FlowFrequency, FlowFrequencyEnum } from "db";

export class GetSdkFlowsDto {
  id: string;
  @ApiProperty({ enum: FlowFrequencyEnum, required: false })
  frequency: FlowFrequency | null;
  clickElement?: string;
  steps: unknown[];
  location?: string;
  userProperties?: unknown;
  _incompleteSteps?: boolean;
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
  type: EventType;
}

export class CreateEventResponseDto {
  id: string;
}
