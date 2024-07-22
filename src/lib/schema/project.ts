import {
  boolean,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { userTable } from "./user";

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

export const projectPersonelTable = pgTable("project_personels", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  projectId: uuid("project_id").notNull(),
  personelId: uuid("personel_id").notNull(),
  createdBy: uuid("created_by").notNull(),
  
  personelPrice: numeric("personel_price").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  active: boolean("active").default(true),


  createdAt: timestamp("created_at").defaultNow(),
});

export type ProjectPersonelSelect = typeof projectPersonelTable.$inferSelect;
export type ProjectPersonelInsert = typeof projectPersonelTable.$inferInsert;

export const projectPersonelRelations = relations(
  projectPersonelTable,
  ({ one }) => ({
    project: one(projectTable, {
      fields: [projectPersonelTable.projectId],
      references: [projectTable.id],
    }),
    personel: one(userTable, {
      fields: [projectPersonelTable.personelId],
      references: [userTable.id],
    }),
  }),
);
