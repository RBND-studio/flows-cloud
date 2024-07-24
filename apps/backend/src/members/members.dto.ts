import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString } from "class-validator";
import { type UserRole, UserRoleEnum } from "db";

export class Invite {
  id: string;
  expires_at: Date;
  organization_name: string;
}

export class GetMeDto {
  pendingInvites: Invite[];
  @ApiProperty({ enum: UserRoleEnum })
  role: UserRole;
  hasPassword: boolean;
  finished_welcome: boolean;
}

export class CompleteUpdateMeDto {
  @IsBoolean()
  finished_welcome: boolean;
}
export class UpdateMeDto extends PartialType(CompleteUpdateMeDto) {}

export class AcceptInviteResponseDto {
  organization_id: string;
}

export class JoinWaitlistDto {
  @IsEmail()
  email: string;
  @IsString()
  captcha_token: string;
}
