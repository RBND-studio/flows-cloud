import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { organizationsToUsers, userInvite, userMetadata, users } from "db";
import { and, eq, gt, sql } from "drizzle-orm";

import type { Auth } from "../auth";
import { DatabaseService } from "../database/database.service";
import { EmailService } from "../email/email.service";
import { verifyCaptcha } from "../lib/captcha";
import { NewsfeedService } from "../newsfeed/newsfeed.service";
import type {
  AcceptInviteResponseDto,
  GetMeDto,
  JoinWaitlistDto,
  UpdateMeDto,
} from "./members.dto";

@Injectable()
export class MembersService {
  constructor(
    private databaseService: DatabaseService,
    private emailService: EmailService,
    private newsfeedService: NewsfeedService,
  ) {}

  async me({ auth }: { auth: Auth }): Promise<GetMeDto> {
    const [usersResult, metaResult] = await Promise.all([
      this.databaseService.db
        .select({
          id: users.id,
          email: users.email,
          has_password:
            sql<boolean>`case when encrypted_password <> '' then true else false end`.as("e"),
        })
        .from(users)
        .where(eq(users.id, auth.userId)),
      this.databaseService.db.query.userMetadata.findFirst({
        where: eq(userMetadata.user_id, auth.userId),
      }),
    ]);
    const user = usersResult.at(0);
    if (!user) throw new InternalServerErrorException();

    let meta = metaResult;

    const newUser = !meta;
    if (newUser) {
      const newMeta = await this.databaseService.db
        .insert(userMetadata)
        .values({ user_id: auth.userId })
        .returning();
      if (user.email) await this.emailService.signedUp({ email: user.email });
      await this.newsfeedService.postMessage({
        message: `🐼🤩 ${auth.email} signed up to Flows!`,
      });

      meta = newMeta.at(0);
    }
    if (!meta) throw new InternalServerErrorException();

    const invites = await (() => {
      if (!user.email) return [];
      return this.databaseService.db.query.userInvite.findMany({
        where: and(eq(userInvite.email, user.email), gt(userInvite.expires_at, sql`now()`)),
        with: {
          organization: true,
        },
      });
    })();

    return {
      pendingInvites: invites.map((invite) => ({
        id: invite.id,
        expires_at: invite.expires_at,
        organization_name: invite.organization.name,
      })),
      role: meta.role,
      hasPassword: user.has_password,
      finished_welcome: meta.finished_welcome,
    };
  }

  async updateProfile({ auth, data }: { auth: Auth; data: UpdateMeDto }): Promise<void> {
    await this.databaseService.db
      .update(userMetadata)
      .set(data)
      .where(eq(userMetadata.user_id, auth.userId));
  }

  async hasAccessToInvite({ auth, inviteId }: { auth: Auth; inviteId: string }): Promise<{
    organizationId: string;
  }> {
    const invite = await this.databaseService.db.query.userInvite.findFirst({
      where: eq(userInvite.id, inviteId),
    });
    if (!invite) throw new NotFoundException();

    const user = await this.databaseService.db.query.users.findFirst({
      where: eq(users.id, auth.userId),
    });
    if (!user) throw new InternalServerErrorException();

    if (invite.expires_at < new Date()) throw new BadRequestException("Invite expired");

    if (user.email !== invite.email) throw new NotFoundException();

    return { organizationId: invite.organization_id };
  }

  async acceptInvite({
    auth,
    inviteId,
  }: {
    auth: Auth;
    inviteId: string;
  }): Promise<AcceptInviteResponseDto> {
    const { organizationId } = await this.hasAccessToInvite({ auth, inviteId });

    await this.databaseService.db.insert(organizationsToUsers).values({
      organization_id: organizationId,
      user_id: auth.userId,
    });

    await this.databaseService.db.delete(userInvite).where(eq(userInvite.id, inviteId));

    return { organization_id: organizationId };
  }

  async declineInvite({ auth, inviteId }: { auth: Auth; inviteId: string }): Promise<void> {
    await this.hasAccessToInvite({ auth, inviteId });

    await this.databaseService.db.delete(userInvite).where(eq(userInvite.id, inviteId));
  }

  async joinWaitlist({ data }: { data: JoinWaitlistDto }): Promise<void> {
    const verifyResult = await verifyCaptcha(data.captcha_token);
    if (!verifyResult?.success) throw new BadRequestException("Invalid captcha");

    const res = await this.emailService.createContact({ email: data.email });
    if (!res.success) throw new InternalServerErrorException(res.message);

    await this.newsfeedService.postMessage({
      message: `🤩 ${data.email} has joined the waitlist!`,
    });
  }

  async joinNewsletter({ auth }: { auth: Auth }): Promise<void> {
    const user = await this.databaseService.db.query.users.findFirst({
      columns: { email: true },
      where: eq(users.id, auth.userId),
    });
    if (!user?.email) throw new InternalServerErrorException();
    await this.emailService.joinNewsletter({ email: user.email });
  }

  async deleteIdentity({ auth, providerId }: { auth: Auth; providerId: string }): Promise<void> {
    const currentIdentity = await this.databaseService.db.execute(
      sql`SELECT provider_id FROM auth.identities WHERE user_id = ${auth.userId} AND provider_id = ${providerId}`,
    );
    if (currentIdentity.length === 0) throw new NotFoundException();

    await this.databaseService.db.execute(
      sql` DELETE FROM auth.identities WHERE user_id = ${auth.userId} AND provider_id = ${providerId}`,
    );
  }

  async deleteUser({ auth }: { auth: Auth }): Promise<void> {
    const userOrganizations = await this.databaseService.db.query.organizationsToUsers.findMany({
      where: eq(organizationsToUsers.user_id, auth.userId),
    });

    if (userOrganizations.length > 0) {
      throw new BadRequestException("Cannot delete user if they are part of an organization");
    }

    //Delete users identities
    await this.databaseService.db.execute(
      sql`DELETE FROM auth.identities WHERE user_id = ${auth.userId}`,
    );
    //Delete users sessions
    await this.databaseService.db.execute(
      sql`DELETE FROM auth.sessions WHERE user_id = ${auth.userId}`,
    );
    //Delete users refresh tokens
    await this.databaseService.db.execute(
      sql`DELETE FROM auth.refresh_tokens WHERE user_id = ${auth.userId}`,
    );
    //Delete user from the database
    await this.databaseService.db.execute(sql`DELETE FROM auth.users WHERE id = ${auth.userId}`);
  }
}
