CREATE TABLE IF NOT EXISTS "employees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"sector" text NOT NULL,
	"age" numeric NOT NULL,
	"resume" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"created_by" uuid NOT NULL
);
