import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { type UserRole, UserRoleEnum } from "db";

export class Invite {
  id: string;
  expires_at: Date;
  organizationName: string;
}

export class GetMeDto {
  pendingInvites: Invite[];
  @ApiProperty({ enum: UserRoleEnum })
  role: UserRole;
}

export class AcceptInviteResponseDto {
  organization_id: string;
}

export class JoinWaitlistDto {
  @IsEmail()
  email: string;
  @IsString()
  captchaToken: string;
}
