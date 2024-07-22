import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@/env";
import * as personel from "./schema/personel";
import * as project from "./schema/project";
import * as user from "./schema/user";
import * as income from "./schema/income";
import * as firm from "./schema/firm";
import * as debt from "./schema/debt";

const pool = new Pool({
  connectionString: env.DRIZZLE_DATABASE_URL,
});

export const db = drizzle(pool, { schema:{
  ...personel,
  ...project,
  ...user,
  ...income,
  ...firm,
  ...debt,
} });
