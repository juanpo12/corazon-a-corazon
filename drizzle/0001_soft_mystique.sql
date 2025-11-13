ALTER TABLE "tickets" ADD COLUMN "quantity" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "tickets_payment_id_unique" ON "tickets" USING btree ("payment_id");