import {
  numeric,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  balance: numeric("balance").notNull().default("0"),
  lastPaid: text("last_paid").notNull().default("never"),
});

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull(),
  role: text("role").notNull().default("client"),
}).enableRLS();