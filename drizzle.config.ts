import { defineConfig } from "drizzle-kit";
import {config} from "dotenv"

config()

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/schema/**/*.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
