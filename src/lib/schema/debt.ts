import {
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { userTable } from "./user";

export const debtTable = pgTable("debts", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  amount: numeric("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  createdBy: uuid("created_by").notNull(),
});

export const debtRelations = relations(debtTable, ({ one }) => ({
  createdBy: one(userTable, {
    fields: [debtTable.createdBy],
    references: [userTable.id],
  }),
}));

export type DebtSelect = typeof debtTable.$inferSelect;
export type DebtInsert = typeof debtTable.$inferInsert;
