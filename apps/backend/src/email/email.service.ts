import { Injectable } from "@nestjs/common";
import type LoopsClient from "loops";

const importLoops = async (): Promise<typeof LoopsClient> => {
  // eslint-disable-next-line no-eval -- workaround for the ESM import
  const module = (await eval(`import('loops')`)) as { default: typeof LoopsClient };
  return module.default;
};

@Injectable()
export class EmailService {
  async loops(): Promise<LoopsClient> {
    const LoopsClient = await importLoops();
    return new LoopsClient(process.env.BACKEND_LOOPS_API_KEY);
  }

  async sendInvite({
    organizationName,
    email,
  }: {
    organizationName: string;
    email: string;
  }): Promise<ReturnType<LoopsClient["sendTransactionalEmail"]>> {
    const loops = await this.loops();
    return loops.sendTransactionalEmail("clpxmw7h70012jo0pp0pe0hb5", email, {
      orgName: organizationName,
      acceptUrl: process.env.BACKEND_APP_URL,
    });
  }

  async createContact({
    email,
  }: {
    email: string;
  }): Promise<ReturnType<LoopsClient["createContact"]>> {
    const loops = await this.loops();
    return loops.createContact(email);
  }

  async signedUp({ email }: { email: string }): Promise<ReturnType<LoopsClient["sendEvent"]>> {
    const loops = await this.loops();
    return loops.sendEvent({ email }, "signup");
  }
}
