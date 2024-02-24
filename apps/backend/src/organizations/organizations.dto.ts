import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class GetOrganizationsDto {
  id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export class GetOrganizationDetailDto extends GetOrganizationsDto {}

export class CreateOrganizationDto {
  @IsString()
  @MinLength(3)
  name: string;
}

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}

export class InviteUserDto {
  @IsEmail()
  email: string;
}

export class OrganizationMemberDto {
  id: string;
  email: string;
}
export class OrganizationInviteDto {
  id: string;
  email: string;
  expires_at: Date;
}

export class GetOrganizationMembersDto {
  members: OrganizationMemberDto[];
  pending_invites: OrganizationInviteDto[];
}
