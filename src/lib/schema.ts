import {
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const userRoles = pgEnum("user_roles", ["admin", "user"]);

export const userTable = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: userRoles("user_roles").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const personelTable = pgTable("personel", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  sector: text("sector").notNull(),
  age: numeric("age").notNull(),
  resume: text("resume").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  createdBy: uuid("created_by").notNull(),
});

export const personelRelations = relations(personelTable, ({ one }) => ({
  createdBy: one(userTable, {
    fields: [personelTable.createdBy],
    references: [userTable.id],
  }),
}));
