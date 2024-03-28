import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const invoices = pgTable("invoice", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  user_name: text("user_name").notNull(),
  user_email: text("user_email").notNull(),
  lemon_squeezy_id: text("lemon_squeezy_id").unique().notNull(),
  subscription_id: integer("subscription_id").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  billing_reason: text("billing_reason").notNull(),
  status: text("status").notNull(),
  status_formatted: text("status_formatted").notNull(),
  refunded_at: timestamp("refunded_at"),
  invoice_url: text("invoice_url"),
  currency: text("currency").notNull(),
  subtotal_formatted: text("subtotal_formatted").notNull(),
  discount_total_formatted: text("discount_total_formatted").notNull(),
  tax_formatted: text("tax_formatted").notNull(),
  total_formatted: text("total_formatted").notNull(),
  organization_id: uuid("organization_id").notNull(),
});

export type NewInvoice = typeof invoices.$inferInsert;
