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
  files: text("files").notNull(),
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

export const projectTable = pgTable("projects", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  projectName: text("name").notNull(),
  firmName: text("firm_name").notNull(),
  sector: text("sector").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  amount: numeric("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  createdBy: uuid("created_by").notNull(),
});

export type ProjectSelect = typeof projectTable.$inferSelect;
export type ProjectInsert = typeof projectTable.$inferInsert;

export const projectRelations = relations(projectTable, ({ one, many }) => ({
  createdBy: one(userTable, {
    fields: [projectTable.createdBy],
    references: [userTable.id],
  }),
  projectPersonels: many(projectPersonelTable),
}));

export const projectPersonelTable = pgTable("project_personel", {
  projectId: uuid("project_id").notNull(),
  personelPrice: numeric("personel_price").notNull(),
  personelId: uuid("personel_id").notNull(),
});

export const projectPersonelTableRelations = relations(
  projectPersonelTable,
  ({ one }) => ({
    personel: one(personelTable, {
      fields: [projectPersonelTable.personelId],
      references: [personelTable.id],
    }),
    project: one(projectTable, {
      fields: [projectPersonelTable.projectId],
      references: [projectTable.id],
    }),
  }),
);

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

export const incomeRelations = relations(incomeTable, ({ one }) => ({
  createdBy: one(userTable, {
    fields: [incomeTable.createdBy],
    references: [userTable.id],
  }),
}));
