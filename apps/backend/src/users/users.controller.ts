import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { type Auth, Authorization } from "../auth";
import { UUIDParam } from "../lib/uuid";
import type { AcceptInviteResponseDto, GetMeDto } from "./users.dto";
import { JoinWaitlistDto } from "./users.dto";
import { UsersService } from "./users.service";

@ApiTags("users")
@ApiBearerAuth()
@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("me")
  me(@Authorization() auth: Auth): Promise<GetMeDto> {
    return this.usersService.me({ auth });
  }

  @Post("invites/:inviteId/accept")
  acceptInvite(
    @Authorization() auth: Auth,
    @UUIDParam("inviteId") inviteId: string,
  ): Promise<AcceptInviteResponseDto> {
    return this.usersService.acceptInvite({ auth, inviteId });
  }

  @Post("invites/:inviteId/decline")
  declineInvite(
    @Authorization() auth: Auth,
    @UUIDParam("inviteId") inviteId: string,
  ): Promise<void> {
    return this.usersService.declineInvite({ auth, inviteId });
  }

  @Post("waitlist")
  joinWaitlist(@Body() body: JoinWaitlistDto): Promise<void> {
    return this.usersService.joinWaitlist({ data: body });
  }

  @Delete("me")
  deleteAccount(@Authorization() auth: Auth): Promise<void> {
    return this.usersService.deleteUser({ auth });
  }

  @Delete("me/identities/:providerId")
  deleteIdentity(
    @Authorization() auth: Auth,
    @Param("providerId") providerId: string,
  ): Promise<void> {
    return this.usersService.deleteIdentity({ auth, providerId });
  }
}
