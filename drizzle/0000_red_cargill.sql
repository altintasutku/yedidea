DO $$ BEGIN
 CREATE TYPE "public"."user_roles" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"user_roles" "user_roles" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
