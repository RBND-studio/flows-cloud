ALTER TYPE "flow_frequency" ADD VALUE 'every-session';--> statement-breakpoint
DROP INDEX IF EXISTS "event_time_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "flow_human_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "flow_human_id_project_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "project_organization_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "project_domain_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "user_invite_email_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "user_invite_organization_id_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "event_time_idx" ON "event" USING btree ("event_time");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "flow_human_id_idx" ON "flow" USING btree ("human_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "flow_human_id_project_id_idx" ON "flow" USING btree ("project_id","human_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_organization_id_idx" ON "project" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_domain_idx" ON "project" USING btree ("domains");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_invite_email_idx" ON "user_invite" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_invite_organization_id_idx" ON "user_invite" USING btree ("organization_id");