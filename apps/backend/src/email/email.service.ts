import { Injectable } from "@nestjs/common";
import { LoopsClient } from "loops";

import { type OrganizationUsageAlertType } from "../types/organization";

const MAILING_LISTS = {
  // cspell:disable-next-line
  onboarding: "clxiswbsb00rt0ljwag785nf6",
  // cspell:disable-next-line
  newsletter: "clxisx0kc00od0ll6hevrbx8j",
};

@Injectable()
export class EmailService {
  get loops(): LoopsClient {
    return new LoopsClient(process.env.BACKEND_LOOPS_API_KEY);
  }

  async sendInvite({
    organizationName,
    inviteId,
    email,
  }: {
    inviteId: string;
    organizationName: string;
    email: string;
  }): Promise<ReturnType<LoopsClient["sendTransactionalEmail"]>> {
    return this.loops.sendTransactionalEmail({
      email,
      transactionalId: "clpxmw7h70012jo0pp0pe0hb5",
      dataVariables: {
        orgName: organizationName,
        acceptUrl: `${process.env.BACKEND_APP_URL}/accept-invite/${inviteId}`,
      },
    });
  }

  async sendUsageAlert({
    email,
    limit,
    isOrganizationSubscribed,
    organizationName,
    organizationId,
    usage,
    type,
    renewsAt,
  }: {
    email: string;
    type: OrganizationUsageAlertType;
    isOrganizationSubscribed: boolean;

    organizationName: string;
    organizationId: string;
    renewsAt: string;
    usage: number;
    limit: number;
  }): Promise<ReturnType<LoopsClient["sendTransactionalEmail"]>> {
    const subsribedTemplateByAlertType: Record<OrganizationUsageAlertType, string> = {
      // cspell:disable-next-line
      approachingUsageLimit: "clwhium2a01nadxap9d3lnvrf",
      // cspell:disable-next-line
      exceededUsageLimit: "clwhj5ue700v5gn9teb9w7ud2",
    };
    const freeTemplateByAlertType: Record<OrganizationUsageAlertType, string> = {
      // cspell:disable-next-line
      approachingUsageLimit: "clwq17f6n0274vmjjp4wmeg60",
      // cspell:disable-next-line
      exceededUsageLimit: "clwq16zxw01e4lt7jed3sogpz",
    };
    const template = isOrganizationSubscribed
      ? subsribedTemplateByAlertType[type]
      : freeTemplateByAlertType[type];

    return this.loops.sendTransactionalEmail({
      email,
      transactionalId: template,
      dataVariables: {
        organizationId,
        organizationName,
        renewsAt,
        usage,
        limit,
      },
    });
  }

  async createContact({
    email,
  }: {
    email: string;
  }): Promise<ReturnType<LoopsClient["createContact"]>> {
    return this.loops.createContact(email);
  }

  async signedUp({ email }: { email: string }): Promise<ReturnType<LoopsClient["sendEvent"]>> {
    return this.loops.sendEvent({
      email,
      eventName: "signup",
      mailingLists: { [MAILING_LISTS.onboarding]: true },
    });
  }

  async joinNewsletter({
    email,
  }: {
    email: string;
  }): Promise<ReturnType<LoopsClient["sendEvent"]>> {
    return this.loops.sendEvent({
      email,
      eventName: "newsletter_signup",
      mailingLists: { [MAILING_LISTS.newsletter]: true },
    });
  }
}
