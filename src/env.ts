import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    DRIZZLE_DATABASE_URL: z.string().url(),
  },
  client: {
  },
  runtimeEnv: {
    DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL,
  },
});