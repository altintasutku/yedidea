CREATE TABLE IF NOT EXISTS "debts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"amount" numeric NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"created_by" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "amount" numeric NOT NULL;