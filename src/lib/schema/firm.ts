import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { userTable } from "./user";

export const firmTable = pgTable("firma", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  sector: text("sector").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  createdBy: uuid("created_by").notNull(),
});

export const firmRelations = relations(firmTable, ({ one }) => ({
  createdBy: one(userTable, {
    fields: [firmTable.createdBy],
    references: [userTable.id],
  }),
}));
