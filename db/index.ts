import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

if (process.env.NODE_ENV !== "production") {
  await import("dotenv/config");
}

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql);
