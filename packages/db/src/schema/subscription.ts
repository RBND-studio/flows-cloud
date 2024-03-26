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
  trial_ends_at: timestamp("trial_ends_at"),
  price: text("price").notNull(),
  is_usage_based: boolean("is_usage_based").notNull(),
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
