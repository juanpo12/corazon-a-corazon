import { pgTable, serial, varchar, integer, timestamp, text, boolean, numeric } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 255 }),
  date: timestamp("date", { withTimezone: true }).notNull(),
  price: integer("price").notNull(),
  stock: integer("stock").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .references(() => events.id)
    .notNull(),
  buyerName: varchar("buyer_name", { length: 255 }).notNull(),
  buyerEmail: varchar("buyer_email", { length: 255 }).notNull(),
  amountPaid: numeric("amount_paid", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"), // pending, paid, failed
  paymentId: varchar("payment_id", { length: 255 }), // ID de MercadoPago u otro gateway
  createdAt: timestamp("created_at").defaultNow(),
});

