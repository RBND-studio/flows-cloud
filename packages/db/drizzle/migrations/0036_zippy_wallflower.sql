CREATE TABLE IF NOT EXISTS "flow_user_progress" (
	"user_hash" text NOT NULL,
	"flow_id" uuid NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "flow_user_progress_flow_id_user_hash_pk" PRIMARY KEY("flow_id","user_hash")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flow_user_progress" ADD CONSTRAINT "flow_user_progress_flow_id_flow_id_fk" FOREIGN KEY ("flow_id") REFERENCES "public"."flow"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
