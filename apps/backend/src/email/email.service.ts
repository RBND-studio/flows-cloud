import { Injectable } from "@nestjs/common";
import { LoopsClient } from "loops";

import { type OrganizationUsageAlertType } from "../types/organization";

@Injectable()
export class EmailService {
  get loops(): LoopsClient {
    return new LoopsClient(process.env.BACKEND_LOOPS_API_KEY);
  }

  async sendInvite({
    organizationName,
    email,
  }: {
    organizationName: string;
    email: string;
  }): Promise<ReturnType<LoopsClient["sendTransactionalEmail"]>> {
    return this.loops.sendTransactionalEmail("clpxmw7h70012jo0pp0pe0hb5", email, {
      orgName: organizationName,
      acceptUrl: process.env.BACKEND_APP_URL,
    });
  }

  async sendUsageAlert({
    email,
    limit,
    organizationName,
    organizationId,
    usage,
    type,
    renewsAt,
  }: {
    email: string;
    type: OrganizationUsageAlertType;

    organizationName: string;
    organizationId: string;
    renewsAt: string;
    usage: number;
    limit: number;
  }): Promise<ReturnType<LoopsClient["sendTransactionalEmail"]>> {
    const templateByAlertType: Record<OrganizationUsageAlertType, string> = {
      // cspell:disable-next-line
      approachingUsageLimit: "clwhium2a01nadxap9d3lnvrf",
      // cspell:disable-next-line
      exceededUsageLimit: "clwhj5ue700v5gn9teb9w7ud2",
    };
    return this.loops.sendTransactionalEmail(templateByAlertType[type], email, {
      organizationId,
      organizationName,
      renewsAt,
      usage,
      limit,
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
    return this.loops.sendEvent({ email, eventName: "signup" });
  }
}
