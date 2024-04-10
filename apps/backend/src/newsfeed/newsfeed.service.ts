import { Injectable } from "@nestjs/common";

@Injectable()
export class NewsfeedService {
  private fetchSlackWebhook({ message, url }: { url: string; message: string }): Promise<Response> {
    return fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        text: message,
      }),
    });
  }

  async postMessage({ message }: { message: string }): Promise<Response> {
    return this.fetchSlackWebhook({ message, url: process.env.BACKEND_SLACK_WEBHOOK_URL });
  }

  async postIssue({ message }: { message: string }): Promise<Response> {
    return this.fetchSlackWebhook({ message, url: process.env.BACKEND_SLACK_ISSUES_WEBHOOK_URL });
  }
}
