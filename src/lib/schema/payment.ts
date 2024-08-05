import { relations, sql } from "drizzle-orm";
import { numeric, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { debtTable } from "./debt";

export const paymentTable = pgTable("payment", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  personelId: uuid("personel_id").notNull(),
  paidAmount: numeric("paid_amount").notNull(),
  debtId: uuid("debt_id"),
  createdBy: uuid("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const paymentRelations = relations(paymentTable, ({ one }) => ({
  createdBy: one(userTable, {
    fields: [paymentTable.createdBy],
    references: [userTable.id],
  }),
  debt: one(debtTable, {
    fields: [paymentTable.debtId],
    references: [debtTable.id],
  }),
}));

export type PaymentSelect = typeof paymentTable.$inferSelect;
export type PaymentInsert = typeof paymentTable.$inferInsert;
