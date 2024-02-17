import { PartialType } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

export class GetProjectsDto {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export class GetProjectDetailDto extends GetProjectsDto {
  domains: string[];
  css_vars?: string;
  css_template?: string;
}

export class CreateProjectDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString({ each: true })
  @IsOptional()
  domains?: string[];
}

export class CompleteUpdateProjectDto extends CreateProjectDto {
  @IsString()
  description: string;

  @IsString({ each: true })
  domains: string[];

  @IsString()
  css_vars: string | null;

  @IsString()
  css_template: string | null;
}

export class UpdateProjectDto extends PartialType(CompleteUpdateProjectDto) {}
