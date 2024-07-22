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

export const incomeTable = pgTable("incomes", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  amount: numeric("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  createdBy: uuid("created_by").notNull(),
});

export type IncomeSelect = typeof incomeTable.$inferSelect;
export type IncomeInsert = typeof incomeTable.$inferInsert;

export const incomeRelations = relations(incomeTable, ({ one }) => ({
  createdBy: one(userTable, {
    fields: [incomeTable.createdBy],
    references: [userTable.id],
  }),
}));
