import {
  cancelSubscription as cancelSubscriptionLS,
  createUsageRecord as createUsageRecordLS,
  getPrice as getPriceLS,
  lemonSqueezySetup,
  type NewUsageRecord,
  type UpdateSubscription,
  updateSubscription as updateSubscriptionLS,
} from "@lemonsqueezy/lemonsqueezy.js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LemonSqueezyService {
  constructor() {
    this.configureLemonSqueezy();
  }

  configureLemonSqueezy(): void {
    const requiredVars = [
      "BACKEND_LEMONSQUEEZY_WEBHOOK_SECRET",
      "BACKEND_LEMONSQUEEZY_API_KEY",
      "BACKEND_LEMONSQUEEZY_STORE_ID",
    ];

    const missingVars = requiredVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required LEMONSQUEEZY env variables: ${missingVars.join(
          ", ",
        )}. Please, set them in your .env file.`,
      );
    }

    lemonSqueezySetup({
      apiKey: process.env.BACKEND_LEMONSQUEEZY_API_KEY,
      onError: (error) => {
        // eslint-disable-next-line no-console -- allow logging
        console.error(error);
        throw new Error(`Lemon Squeezy API error: ${error.message}`);
      },
    });
  }

  createUsageRecord(record: NewUsageRecord): ReturnType<typeof createUsageRecordLS> {
    return createUsageRecordLS(record);
  }

  getPrice(priceId: number | string): ReturnType<typeof getPriceLS> {
    return getPriceLS(priceId);
  }

  updateSubscription(
    subscriptionId: string | number,
    updateSubscription: UpdateSubscription,
  ): ReturnType<typeof updateSubscriptionLS> {
    return updateSubscriptionLS(subscriptionId, updateSubscription);
  }

  cancelSubscription(subscriptionId: string | number): ReturnType<typeof cancelSubscriptionLS> {
    return cancelSubscriptionLS(subscriptionId);
  }
}
