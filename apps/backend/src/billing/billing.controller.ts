import { Body, Controller, Headers, Post, RawBodyRequest, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { BillingService } from "./billing.service";

@ApiTags("billing")
@Controller()
export class BillingController {
  constructor(private billingService: BillingService) {}

  @Post("webhooks/lemon-squeezy")
  handleLemonSqueezyWebhook(
    @Req() req: RawBodyRequest<unknown>,
    @Body() body: unknown,
    @Headers("X-Signature") signature: string,
  ): Promise<void> {
    return this.billingService.handleLemonSqueezyWebhook({
      data: body,
      signature,
      rawBody: req.rawBody,
    });
  }
}
