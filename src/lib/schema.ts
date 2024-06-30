import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("users",{
    id: serial('id').primaryKey(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})