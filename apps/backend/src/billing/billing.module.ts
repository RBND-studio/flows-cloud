import { Module } from "@nestjs/common";

import { BillingController } from "./billiing.controller";
import { BillingService } from "./billing.service";

@Module({
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
