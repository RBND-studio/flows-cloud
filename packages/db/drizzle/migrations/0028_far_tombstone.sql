CREATE TABLE IF NOT EXISTS "invoice" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_name" text NOT NULL,
	"user_email" text NOT NULL,
	"lemon_squeezy_id" text NOT NULL,
	"subscription_id" integer NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"billing_reason" text NOT NULL,
	"status" text NOT NULL,
	"status_formatted" text NOT NULL,
	"refunded_at" timestamp,
	"invoice_url" text,
	"currency" text NOT NULL,
	"subtotal_formatted" text NOT NULL,
	"discount_total_formatted" text NOT NULL,
	"tax_formatted" text NOT NULL,
	"total_formatted" text NOT NULL,
	"organization_id" uuid NOT NULL,
	CONSTRAINT "invoice_id_unique" UNIQUE("id"),
	CONSTRAINT "invoice_lemon_squeezy_id_unique" UNIQUE("lemon_squeezy_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscription" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lemon_squeezy_id" text NOT NULL,
	"order_id" integer NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"status" text NOT NULL,
	"status_formatted" text NOT NULL,
	"renews_at" timestamp NOT NULL,
	"ends_at" timestamp,
	"trial_ends_at" timestamp,
	"price" text NOT NULL,
	"is_usage_based" boolean NOT NULL,
	"is_paused" boolean NOT NULL,
	"subscription_item_id" integer NOT NULL,
	"organization_id" uuid NOT NULL,
	CONSTRAINT "subscription_id_unique" UNIQUE("id"),
	CONSTRAINT "subscription_lemon_squeezy_id_unique" UNIQUE("lemon_squeezy_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "webhook_event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"event_name" text NOT NULL,
	"processed" boolean DEFAULT false NOT NULL,
	"body" jsonb NOT NULL,
	"processing_error" text,
	CONSTRAINT "webhook_event_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscription" ADD CONSTRAINT "subscription_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
