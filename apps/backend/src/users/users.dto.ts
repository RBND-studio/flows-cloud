import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
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
}

export class AcceptInviteResponseDto {
  organization_id: string;
}

export class JoinWaitlistDto {
  @IsEmail()
  email: string;
  @IsString()
  captcha_token: string;
}
