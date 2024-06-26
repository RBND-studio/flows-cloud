import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { type Auth, Authorization } from "../auth";
import { UUIDParam } from "../lib/uuid";
import type {
  GetOrganizationDetailDto,
  GetOrganizationDto,
  GetOrganizationInvoiceDto,
  GetOrganizationListItemDto,
  GetOrganizationMembersDto,
  GetSubscriptionDetailDto,
} from "./organizations.dto";
import { CreateOrganizationDto, InviteUserDto, UpdateOrganizationDto } from "./organizations.dto";
import { OrganizationsService } from "./organizations.service";

@ApiTags("organizations")
@ApiBearerAuth()
@Controller()
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Get("organizations")
  getOrganizations(@Authorization() auth: Auth): Promise<GetOrganizationListItemDto[]> {
    return this.organizationsService.getOrganizations({ auth });
  }

  @Get("organizations/:organizationId")
  getOrganizationDetail(
    @Authorization() auth: Auth,
    @UUIDParam("organizationId") organizationId: string,
  ): Promise<GetOrganizationDetailDto> {
    return this.organizationsService.getOrganizationDetail({ auth, organizationId });
  }

  @Post("organizations")
  createOrganization(
    @Authorization() auth: Auth,
    @Body() body: CreateOrganizationDto,
  ): Promise<GetOrganizationDto> {
    return this.organizationsService.createOrganization({ auth, data: body });
  }

  @Patch("organizations/:organizationId")
  updateOrganization(
    @Authorization() auth: Auth,
    @UUIDParam("organizationId") organizationId: string,
    @Body() body: UpdateOrganizationDto,
  ): Promise<GetOrganizationDto> {
    return this.organizationsService.updateOrganization({ auth, organizationId, data: body });
  }

  @Delete("organizations/:organizationId")
  deleteOrganization(
    @Authorization() auth: Auth,
    @UUIDParam("organizationId") organizationId: string,
  ): Promise<void> {
    return this.organizationsService.deleteOrganization({ auth, organizationId });
  }

  @Post("organizations/:organizationId/users")
  inviteUser(
    @Authorization() auth: Auth,
    @UUIDParam("organizationId") organizationId: string,
    @Body() body: InviteUserDto,
  ): Promise<void> {
    return this.organizationsService.inviteUser({ auth, organizationId, email: body.email });
  }

  @Post("organizations/:organizationId/users/leave")
  leaveOrganization(
    @Authorization() auth: Auth,
    @UUIDParam("organizationId") organizationId: string,
  ): Promise<void> {
    return this.organizationsService.leaveOrganization({ auth, organizationId });
  }

  @Delete("organizations/:organizationId/users/:userId")
  removeUser(
    @Authorization() auth: Auth,
    @UUIDParam("organizationId") organizationId: string,
    @UUIDParam("userId") userId: string,
  ): Promise<void> {
    return this.organizationsService.removeUser({ auth, organizationId, userId });
  }

  @Delete("/invites/:inviteId")
  removeInvite(
    @Authorization() auth: Auth,
    @UUIDParam("inviteId") inviteId: string,
  ): Promise<void> {
    return this.organizationsService.deleteInvite({ auth, inviteId });
  }

  @Get("organizations/:organizationId/users")
  getUsers(
    @Authorization() auth: Auth,
    @UUIDParam("organizationId") organizationId: string,
  ): Promise<GetOrganizationMembersDto> {
    return this.organizationsService.getOrganizationMembers({ auth, organizationId });
  }

  @Get("subscriptions/:subscriptionId")
  getSubscription(
    @Authorization() auth: Auth,
    @UUIDParam("subscriptionId") subscriptionId: string,
  ): Promise<GetSubscriptionDetailDto> {
    return this.organizationsService.getSubscription({ auth, subscriptionId });
  }

  @Post("subscriptions/:subscriptionId/cancel")
  cancelSubscription(
    @Authorization() auth: Auth,
    @UUIDParam("subscriptionId") subscriptionId: string,
  ): Promise<void> {
    return this.organizationsService.cancelSubscription({ auth, subscriptionId });
  }

  @Get("organizations/:organizationId/invoices")
  getInvoices(
    @Authorization() auth: Auth,
    @UUIDParam("organizationId") organizationId: string,
  ): Promise<GetOrganizationInvoiceDto[]> {
    return this.organizationsService.getInvoices({ auth, organizationId });
  }
}
