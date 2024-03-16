import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { organizationsToUsers, userInvite, userMetadata, users } from "db";
import { and, eq, gt, sql } from "drizzle-orm";

import type { Auth } from "../auth";
import { DatabaseService } from "../database/database.service";
import { EmailService } from "../email/email.service";
import { verifyCaptcha } from "../lib/captcha";
import { NewsfeedService } from "../newsfeed/newsfeed.service";
import type { AcceptInviteResponseDto, GetMeDto, JoinWaitlistDto } from "./users.dto";

@Injectable()
export class UsersService {
  constructor(
    private databaseService: DatabaseService,
    private emailService: EmailService,
    private newsfeedService: NewsfeedService,
  ) {}

  async me({ auth }: { auth: Auth }): Promise<GetMeDto> {
    let meta = await this.databaseService.db.query.userMetadata.findFirst({
      where: eq(userMetadata.user_id, auth.userId),
    });
    if (!meta) {
      const newMeta = await this.databaseService.db
        .insert(userMetadata)
        .values({ user_id: auth.userId })
        .returning();
      await this.newsfeedService.postMessage({
        message: `🐼🤩 ${auth.email} signed up to Flows!`,
      });

      meta = newMeta.at(0);
    }
    if (!meta) throw new NotFoundException();

    const user = await this.databaseService.db.query.users.findFirst({
      where: eq(users.id, auth.userId),
    });
    if (!user) throw new NotFoundException();

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
        organizationName: invite.organization.name,
      })),
      role: meta.role,
    };
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
    if (!user) throw new NotFoundException();

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
    const verifyResult = await verifyCaptcha(data.captchaToken);
    if (!verifyResult?.success) throw new BadRequestException("Invalid captcha");

    const res = await this.emailService.createContact({ email: data.email });
    if (!res.success) throw new BadRequestException(res.message);

    await this.newsfeedService.postMessage({
      message: `🤩 ${data.email} has joined the waitlist!`,
    });
  }

  async deleteUser({ auth }: { auth: Auth }): Promise<void> {
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
