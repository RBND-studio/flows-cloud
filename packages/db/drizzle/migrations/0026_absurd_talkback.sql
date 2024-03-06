ALTER TABLE "flow" DROP CONSTRAINT "flow_draft_version_id_flow_version_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flow" ADD CONSTRAINT "flow_draft_version_id_flow_version_id_fk" FOREIGN KEY ("draft_version_id") REFERENCES "flow_version"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
