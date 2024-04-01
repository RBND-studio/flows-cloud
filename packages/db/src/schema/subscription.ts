import { relations } from "drizzle-orm";
import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { organizations } from "./organization";

export const subscriptions = pgTable("subscription", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  lemon_squeezy_id: text("lemon_squeezy_id").unique().notNull(),
  order_id: integer("order_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  status: text("status").notNull(),
  status_formatted: text("status_formatted").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  renews_at: timestamp("renews_at").notNull(),
  ends_at: timestamp("ends_at"),
  price_tiers: jsonb("price_tiers")
    .$type<{ last_unit: string; unit_price_decimal: string | null }[]>()
    .notNull(),
  trial_ends_at: timestamp("trial_ends_at"),
  is_paused: boolean("is_paused").notNull(),
  subscription_item_id: integer("subscription_item_id").notNull(),
  organization_id: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
});

export const webhookEvents = pgTable("webhook_event", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  event_name: text("event_name").notNull(),
  processed: boolean("processed").default(false).notNull(),
  body: jsonb("body").notNull(),
  processing_error: text("processing_error"),
});

export type NewSubscription = typeof subscriptions.$inferInsert;

export const subscriptionOrganization = relations(subscriptions, ({ one }) => ({
  organization: one(organizations, {
    references: [organizations.id],
    fields: [subscriptions.organization_id],
  }),
}));
