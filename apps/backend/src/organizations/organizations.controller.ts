import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { type Auth, Authorization } from "../auth";
import type {
  GetOrganizationDetailDto,
  GetOrganizationMembersDto,
  GetOrganizationsDto,
} from "./organizations.dto";
import { CreateOrganizationDto, InviteUserDto } from "./organizations.dto";
import { OrganizationsService } from "./organizations.service";

@ApiTags("organizations")
@ApiBearerAuth()
@Controller()
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Get("organizations")
  getOrganizations(@Authorization() auth: Auth): Promise<GetOrganizationsDto[]> {
    return this.organizationsService.getOrganizations({ auth });
  }

  @Get("organizations/:organizationId")
  getOrganizationDetail(
    @Authorization() auth: Auth,
    @Param("organizationId") organizationId: string,
  ): Promise<GetOrganizationDetailDto> {
    return this.organizationsService.getOrganizationDetail({ auth, organizationId });
  }

  @Post("organizations")
  createOrganization(
    @Authorization() auth: Auth,
    @Body() body: CreateOrganizationDto,
  ): Promise<GetOrganizationDetailDto> {
    return this.organizationsService.createOrganization({ auth, data: body });
  }

  @Delete("organizations/:organizationId")
  deleteOrganization(
    @Authorization() auth: Auth,
    @Param("organizationId") organizationId: string,
  ): Promise<void> {
    return this.organizationsService.deleteOrganization({ auth, organizationId });
  }

  @Post("organizations/:organizationId/users")
  inviteUser(
    @Authorization() auth: Auth,
    @Param("organizationId") organizationId: string,
    @Body() body: InviteUserDto,
  ): Promise<void> {
    return this.organizationsService.inviteUser({ auth, organizationId, email: body.email });
  }

  @Delete("organizations/:organizationId/users/:userId")
  removeUser(
    @Authorization() auth: Auth,
    @Param("organizationId") organizationId: string,
    @Param("userId") userId: string,
  ): Promise<void> {
    return this.organizationsService.removeUser({ auth, organizationId, userId });
  }

  @Get("organizations/:organizationId/users")
  getUsers(
    @Authorization() auth: Auth,
    @Param("organizationId") organizationId: string,
  ): Promise<GetOrganizationMembersDto[]> {
    return this.organizationsService.getOrganizationMembers({ auth, organizationId });
  }
}
