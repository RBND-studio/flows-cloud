import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsString, Length, MinLength } from "class-validator";
import { FlowFrequency, FlowFrequencyEnum, FlowType, FlowTypeEnum } from "db";

export class GetFlowBase {
  id: string;
  human_id: string;
  project_id: string;
  name: string;
  @ApiProperty({ enum: FlowTypeEnum })
  flow_type: FlowType;
  description: string;
  created_at: Date;
  updated_at: Date;
  enabled_at: Date | null;
  preview_url: string | null;
}

export class GetFlowsDto extends GetFlowBase {
  start_count: number;
}

export class PreviewStatBucketDto {
  count: number;
  type: string;
}

export class FlowVersionDto {
  @ApiProperty({ enum: FlowFrequencyEnum })
  frequency: FlowFrequency;
  userProperties: unknown[][];
  clickElement?: string;
  location?: string;
  steps: unknown[];
}

export class GetFlowDetailDto extends GetFlowBase {
  preview_stats: PreviewStatBucketDto[];
  draftVersion?: FlowVersionDto;
  publishedVersion?: FlowVersionDto;
}

export class CompleteUpdateFlowDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  @Length(3, 32)
  human_id: string;
  @IsBoolean()
  enabled: boolean;
  @IsString()
  clickElement: string;
  @IsString()
  location: string;
  @IsArray()
  steps: unknown[];
  @ApiProperty({ type: [Array], required: false })
  @IsArray()
  userProperties: unknown[][];
  @IsEnum(FlowFrequencyEnum)
  frequency: FlowFrequencyEnum;
  @IsString()
  preview_url: string;
}

export class UpdateFlowDto extends PartialType(CompleteUpdateFlowDto) {}

export class CreateFlowDto {
  @IsString()
  @MinLength(3)
  name: string;
}

export class GetFlowVersionsDto {
  id: string;
  created_at: Date;
  data: unknown;
  @ApiProperty({ enum: FlowFrequencyEnum })
  frequency: FlowFrequency;
}

export class StatBucketDto {
  date: Date;
  count: number;
  type: string;
}
export class GetFlowAnalyticsDto {
  daily_stats: StatBucketDto[];
}
