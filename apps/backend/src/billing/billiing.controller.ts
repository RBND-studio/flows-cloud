import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { BillingService } from "./billing.service";

@ApiTags("billing")
@Controller()
export class BillingController {
  constructor(private billingService: BillingService) {}

  @Post("webhooks/lemon-squeezy")
  handleLemonSqueezyWebhook(@Body() body: string): Promise<void> {
    return this.billingService.handleLemonSqueezyWebhook(body);
  }
}
