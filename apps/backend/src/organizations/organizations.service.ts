import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { organizations, organizationsToUsers, userInvite } from "db";
import { and, eq, gt, sql } from "drizzle-orm";

import type { Auth } from "../auth";
import { DatabaseService } from "../database/database.service";
import { DbPermissionService } from "../db-permission/db-permission.service";
import { EmailService } from "../email/email.service";
import type {
  CreateOrganizationDto,
  GetOrganizationDetailDto,
  GetOrganizationMembersDto,
  GetOrganizationsDto,
  OrganizationMemberDto,
  UpdateOrganizationDto,
} from "./organizations.dto";

@Injectable()
export class OrganizationsService {
  constructor(
    private databaseService: DatabaseService,
    private emailService: EmailService,
    private dbPermissionService: DbPermissionService,
  ) {}

  async getOrganizations({ auth }: { auth: Auth }): Promise<GetOrganizationsDto[]> {
    const orgs = await this.databaseService.db
      .select({
        organization: organizations,
      })
      .from(organizations)
      .leftJoin(
        organizationsToUsers,
        and(
          eq(organizations.id, organizationsToUsers.organization_id),
          eq(organizationsToUsers.user_id, auth.userId),
        ),
      )
      .where(eq(organizationsToUsers.user_id, auth.userId))
      .orderBy(organizations.name);

    return orgs.map(({ organization }) => ({
      id: organization.id,
      name: organization.name,
      description: organization.description,
      created_at: organization.created_at,
      updated_at: organization.updated_at,
    }));
  }

  async getOrganizationDetail({
    auth,
    organizationId,
  }: {
    auth: Auth;
    organizationId: string;
  }): Promise<GetOrganizationDetailDto> {
    await this.dbPermissionService.doesUserHaveAccessToOrganization({ auth, organizationId });

    const org = await this.databaseService.db.query.organizations.findFirst({
      where: eq(organizations.id, organizationId),
    });
    if (!org) throw new NotFoundException();

    return {
      id: org.id,
      name: org.name,
      description: org.description,
      created_at: org.created_at,
      updated_at: org.updated_at,
    };
  }

  async createOrganization({
    auth,
    data,
  }: {
    auth: Auth;
    data: CreateOrganizationDto;
  }): Promise<GetOrganizationDetailDto> {
    const orgs = await this.databaseService.db
      .insert(organizations)
      .values({
        name: data.name,
      })
      .returning();
    const org = orgs.at(0);
    if (!org) throw new BadRequestException("Failed to create organization");
    await this.databaseService.db.insert(organizationsToUsers).values({
      organization_id: org.id,
      user_id: auth.userId,
    });
    return {
      id: org.id,
      name: org.name,
      description: org.description,
      created_at: org.created_at,
      updated_at: org.updated_at,
    };
  }

  async updateOrganization({
    auth,
    data,
    organizationId,
  }: {
    auth: Auth;
    data: UpdateOrganizationDto;
    organizationId: string;
  }): Promise<GetOrganizationDetailDto> {
    await this.dbPermissionService.doesUserHaveAccessToOrganization({ auth, organizationId });

    const updatedOrganizations = await this.databaseService.db
      .update(organizations)
      .set({
        name: data.name,
        updated_at: new Date(),
      })
      .where(eq(organizations.id, organizationId))
      .returning();
    const updatedOrg = updatedOrganizations.at(0);
    if (!updatedOrg) throw new BadRequestException("Failed to update organization");

    return {
      id: updatedOrg.id,
      name: updatedOrg.name,
      description: updatedOrg.description,
      created_at: updatedOrg.created_at,
      updated_at: updatedOrg.updated_at,
    };
  }

  async deleteOrganization({
    auth,
    organizationId,
  }: {
    auth: Auth;
    organizationId: string;
  }): Promise<void> {
    await this.dbPermissionService.doesUserHaveAccessToOrganization({ auth, organizationId });

    await this.databaseService.db.delete(organizations).where(eq(organizations.id, organizationId));
  }

  async inviteUser({
    auth,
    organizationId,
    email,
  }: {
    auth: Auth;
    organizationId: string;
    email: string;
  }): Promise<void> {
    await this.dbPermissionService.doesUserHaveAccessToOrganization({ auth, organizationId });

    const org = await this.databaseService.db.query.organizations.findFirst({
      where: eq(organizations.id, organizationId),
      with: {
        organizationsToUsers: {
          with: {
            user: {
              columns: {
                email: true,
              },
            },
          },
        },
      },
      columns: { name: true },
    });
    if (!org) throw new NotFoundException();

    const userAlreadyInOrg = org.organizationsToUsers.some(
      (orgToUser) => orgToUser.user.email === email,
    );
    if (userAlreadyInOrg) throw new ConflictException("User already in organization");

    const existingInvite = await this.databaseService.db.query.userInvite.findFirst({
      where: and(
        eq(userInvite.organization_id, organizationId),
        eq(userInvite.email, email),
        gt(userInvite.expires_at, sql`now()`),
      ),
    });
    if (existingInvite) throw new ConflictException("User already invited");

    const invites = await this.databaseService.db
      .insert(userInvite)
      .values({
        email,
        organization_id: organizationId,
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      })
      .returning();
    const invite = invites.at(0);
    if (!invite) throw new BadRequestException("Failed to create invite");

    await this.emailService.sendInvite({ email, organizationName: org.name });
  }

  async removeUser({
    auth,
    organizationId,
    userId,
  }: {
    auth: Auth;
    organizationId: string;
    userId: string;
  }): Promise<void> {
    await this.dbPermissionService.doesUserHaveAccessToOrganization({ auth, organizationId });

    if (auth.userId === userId)
      throw new BadRequestException("Cannot remove yourself from organization");

    await this.databaseService.db
      .delete(organizationsToUsers)
      .where(
        and(
          eq(organizationsToUsers.organization_id, organizationId),
          eq(organizationsToUsers.user_id, userId),
        ),
      );
  }

  async deleteInvite({ auth, inviteId }: { auth: Auth; inviteId: string }): Promise<void> {
    const invite = await this.databaseService.db.query.userInvite.findFirst({
      where: eq(userInvite.id, inviteId),
    });
    if (!invite) throw new NotFoundException();

    await this.dbPermissionService.doesUserHaveAccessToOrganization({
      auth,
      organizationId: invite.organization_id,
    });

    await this.databaseService.db.delete(userInvite).where(eq(userInvite.id, inviteId));
  }

  async getOrganizationMembers({
    auth,
    organizationId,
  }: {
    auth: Auth;
    organizationId: string;
  }): Promise<GetOrganizationMembersDto> {
    await this.dbPermissionService.doesUserHaveAccessToOrganization({ auth, organizationId });

    const [members, invites] = await Promise.all([
      this.databaseService.db.query.organizationsToUsers.findMany({
        where: eq(organizationsToUsers.organization_id, organizationId),
        with: {
          user: {
            columns: {
              id: true,
              email: true,
            },
          },
        },
        columns: {},
      }),
      this.databaseService.db.query.userInvite.findMany({
        where: and(
          eq(userInvite.organization_id, organizationId),
          gt(userInvite.expires_at, sql`now()`),
        ),
        columns: {
          email: true,
          id: true,
          expires_at: true,
        },
      }),
    ]);

    return {
      members: members.map(({ user }) => user as OrganizationMemberDto),
      pending_invites: invites,
    };
  }
}
