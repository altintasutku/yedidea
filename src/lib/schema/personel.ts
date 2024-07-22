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

export const personelTable = pgTable("personel", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  sector: text("sector").notNull(),
  age: numeric("age").notNull(),
  files: text("files").notNull(),
  photo: text("photo").notNull(),
  gender: text("gender").notNull(),
  phone: text("phone").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  createdBy: uuid("created_by").notNull(),
});

export const personelRelations = relations(personelTable, ({ one, many }) => ({
  createdBy: one(userTable, {
    fields: [personelTable.createdBy],
    references: [userTable.id],
  }),
}));
