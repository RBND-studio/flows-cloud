ALTER TABLE "subscription" ADD COLUMN "price_tiers" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription" DROP COLUMN IF EXISTS "price";--> statement-breakpoint
ALTER TABLE "subscription" DROP COLUMN IF EXISTS "is_usage_based";