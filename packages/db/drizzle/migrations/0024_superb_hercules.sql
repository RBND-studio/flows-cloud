DO $$ BEGIN
 CREATE TYPE "user_role" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_metadata" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"role" "user_role" DEFAULT 'user' NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_metadata" ADD CONSTRAINT "user_metadata_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
