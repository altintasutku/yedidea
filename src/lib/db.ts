import { env } from "@/env";
import * as personel from "./schema/personel";
import * as project from "./schema/project";
import * as user from "./schema/user";
import * as income from "./schema/income";
import * as firm from "./schema/firm";
import * as debt from "./schema/debt";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql, {
  schema: {
    ...personel,
    ...project,
    ...user,
    ...income,
    ...firm,
    ...debt,
  },
});