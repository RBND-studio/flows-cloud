import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { type Auth, Authorization } from "../auth";
import { UUIDParam } from "../lib/uuid";
import type { AcceptInviteResponseDto, GetMeDto } from "./members.dto";
import { JoinWaitlistDto, UpdateMeDto } from "./members.dto";
import { MembersService } from "./members.service";

@ApiTags("members")
@ApiBearerAuth()
@Controller()
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Get("me")
  me(@Authorization() auth: Auth): Promise<GetMeDto> {
    return this.membersService.me({ auth });
  }

  @Post("invites/:inviteId/accept")
  acceptInvite(
    @Authorization() auth: Auth,
    @UUIDParam("inviteId") inviteId: string,
  ): Promise<AcceptInviteResponseDto> {
    return this.membersService.acceptInvite({ auth, inviteId });
  }

  @Patch("me")
  updateMe(@Authorization() auth: Auth, @Body() body: UpdateMeDto): Promise<void> {
    return this.membersService.updateProfile({ auth, data: body });
  }

  @Post("invites/:inviteId/decline")
  declineInvite(
    @Authorization() auth: Auth,
    @UUIDParam("inviteId") inviteId: string,
  ): Promise<void> {
    return this.membersService.declineInvite({ auth, inviteId });
  }

  @Post("waitlist")
  joinWaitlist(@Body() body: JoinWaitlistDto): Promise<void> {
    return this.membersService.joinWaitlist({ data: body });
  }

  @Post("newsletter")
  joinNewsletter(@Authorization() auth: Auth): Promise<void> {
    return this.membersService.joinNewsletter({ auth });
  }

  @Delete("me")
  deleteAccount(@Authorization() auth: Auth): Promise<void> {
    return this.membersService.deleteUser({ auth });
  }

  @Delete("me/identities/:providerId")
  deleteIdentity(
    @Authorization() auth: Auth,
    @Param("providerId") providerId: string,
  ): Promise<void> {
    return this.membersService.deleteIdentity({ auth, providerId });
  }
}
