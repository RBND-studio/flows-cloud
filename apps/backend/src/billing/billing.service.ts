import crypto from "node:crypto";

import { BadRequestException, Injectable } from "@nestjs/common";
import { invoices, type NewInvoice, type NewSubscription, subscriptions, webhookEvents } from "db";
import { eq } from "drizzle-orm";

import { DatabaseService } from "../database/database.service";
import { LemonSqueezyService } from "../lemon-squeezy/lemon-squeezy.service";
import {
  webhookHasMeta,
  webhookHasSubscriptionData,
  webhookHasSubscriptionPaymentData,
} from "../lib/lemon-squeezy";
import { OrganizationUsageService } from "../organization-usage/organization-usage.service";

@Injectable()
export class BillingService {
  constructor(
    private databaseService: DatabaseService,
    private organizationUsageService: OrganizationUsageService,
    private lemonSqueezyService: LemonSqueezyService,
  ) {}

  async handleLemonSqueezyWebhook({
    data,
    rawBody,
    signature: signatureHeader,
  }: {
    data: unknown;
    rawBody?: Buffer;
    signature: string;
  }): Promise<void> {
    if (!rawBody) throw new BadRequestException();

    const hmac = crypto.createHmac("sha256", process.env.BACKEND_LEMONSQUEEZY_WEBHOOK_SECRET);
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signature = Buffer.from(signatureHeader, "utf8");

    if (!crypto.timingSafeEqual(digest, signature))
      throw new BadRequestException("Invalid signature");

    if (!webhookHasMeta(data)) throw new BadRequestException("Data invalid");

    const newWebhooks = await this.databaseService.db
      .insert(webhookEvents)
      .values({
        event_name: data.meta.event_name,
        body: data,
      })
      .returning();

    const dbWebhook = newWebhooks.at(0);

    if (!dbWebhook) throw new BadRequestException();

    let processingError: string | null = null;

    this.lemonSqueezyService.configureLemonSqueezy();

    if (data.meta.event_name.startsWith("subscription_payment_")) {
      if (!webhookHasSubscriptionPaymentData(data)) throw new BadRequestException("Data invalid");

      const refunded_at = data.data.attributes.refunded_at as string | null;
      const updateData: NewInvoice = {
        invoice_url: data.data.attributes.urls.invoice_url,
        billing_reason: data.data.attributes.billing_reason as string,
        created_at: new Date(data.data.attributes.created_at as string),
        updated_at: new Date(data.data.attributes.updated_at as string),
        currency: data.data.attributes.currency as string,
        discount_total_formatted: data.data.attributes.discount_total_formatted as string,
        lemon_squeezy_id: data.data.id,
        status: data.data.attributes.status as string,
        status_formatted: data.data.attributes.status_formatted as string,
        subtotal_formatted: data.data.attributes.subtotal_formatted as string,
        subscription_id: data.data.attributes.subscription_id as number,
        tax_formatted: data.data.attributes.tax_formatted as string,
        total_formatted: data.data.attributes.total_formatted as string,
        user_email: data.data.attributes.user_email as string,
        user_name: data.data.attributes.user_name as string,
        refunded_at: refunded_at ? new Date(refunded_at) : null,
        organization_id: data.meta.custom_data.organization_id,
      };

      await this.databaseService.db
        .insert(invoices)
        .values(updateData)
        .onConflictDoUpdate({ target: invoices.lemon_squeezy_id, set: updateData });
    } else if (data.meta.event_name.startsWith("subscription_")) {
      if (!webhookHasSubscriptionData(data)) throw new BadRequestException("Data invalid");
      const attributes = data.data.attributes;

      const priceId = attributes.first_subscription_item.price_id;
      const priceData = await this.lemonSqueezyService.getPrice(priceId);
      if (priceData.error) {
        processingError = `Failed to get the price data for the subscription ${data.data.id}.`;
      }

      const isUsageBased = attributes.first_subscription_item.is_usage_based;
      const price = isUsageBased
        ? priceData.data?.data.attributes.unit_price_decimal
        : priceData.data?.data.attributes.unit_price;

      const ends_at = attributes.ends_at as string | null;
      const trial_ends_at = attributes.trial_ends_at as string | null;

      const updateData: NewSubscription = {
        lemon_squeezy_id: data.data.id,
        order_id: attributes.order_id as number,
        name: attributes.user_name as string,
        email: attributes.user_email as string,
        status: attributes.status as string,
        status_formatted: attributes.status_formatted as string,
        created_at: new Date(attributes.created_at as string),
        updated_at: new Date(attributes.updated_at as string),
        renews_at: new Date(attributes.renews_at as string),
        ends_at: ends_at ? new Date(ends_at) : null,
        trial_ends_at: trial_ends_at ? new Date(trial_ends_at) : null,
        price: price?.toString() ?? "",
        is_paused: false,
        subscription_item_id: attributes.first_subscription_item.id,
        is_usage_based: attributes.first_subscription_item.is_usage_based,
        organization_id: data.meta.custom_data.organization_id,
      };

      try {
        await this.databaseService.db.insert(subscriptions).values(updateData).onConflictDoUpdate({
          target: subscriptions.lemon_squeezy_id,
          set: updateData,
        });
      } catch (error) {
        processingError = `Failed to upsert Subscription #${updateData.lemon_squeezy_id} to the database.`;
      }

      if (data.meta.event_name === "subscription_created") {
        // TODO: uncomment this when we get an update from Lemon Squeezy
        // First we update the billing anchor
        // await this.lemonSqueezyService
        //   .updateSubscription(data.data.id, {
        //     billingAnchor: 1,
        //     disableProrations: true,
        //   })
        //   .then((res) => {
        //     if (res.error)
        //       processingError = `Failed to update the subscription ${updateData.lemon_squeezy_id}.`;
        //   });
        // Then we update usage
        await this.organizationUsageService
          .getOrganizationUsage({ organizationId: updateData.organization_id })
          .then((usage) =>
            this.lemonSqueezyService.createUsageRecord({
              quantity: usage,
              subscriptionItemId: updateData.subscription_item_id,
              action: "increment",
            }),
          )
          .then((res) => {
            if (res.error)
              processingError = `Failed to create the usage record for the subscription ${updateData.lemon_squeezy_id}.`;
          });
      }
    }

    await this.databaseService.db
      .update(webhookEvents)
      .set({
        processed: true,
        processing_error: processingError,
      })
      .where(eq(webhookEvents.id, dbWebhook.id));
  }
}
