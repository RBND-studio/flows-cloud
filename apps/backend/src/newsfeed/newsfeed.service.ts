import { Injectable } from "@nestjs/common";

import { retry } from "../lib/retry";

@Injectable()
export class NewsfeedService {
  private fetchSlackWebhook({ message, url }: { url: string; message: string }): Promise<Response> {
    return retry(() =>
      fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          text: message,
        }),
      }).then((res) => {
        if (!res.ok) throw new Error();
        return res;
      }),
    );
  }

  async postMessage({ message }: { message: string }): Promise<Response> {
    return this.fetchSlackWebhook({ message, url: process.env.BACKEND_SLACK_WEBHOOK_URL });
  }
}
