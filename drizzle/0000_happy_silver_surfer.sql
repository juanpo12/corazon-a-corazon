CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"location" varchar(255),
	"date" timestamp with time zone NOT NULL,
	"price" integer NOT NULL,
	"stock" integer NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"buyer_name" varchar(255) NOT NULL,
	"buyer_email" varchar(255) NOT NULL,
	"amount_paid" numeric(10, 2) NOT NULL,
	"payment_status" varchar(50) DEFAULT 'pending',
	"payment_id" varchar(255),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;