// import "dotenv/config";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(
  "postgresql://AFPedreros:SOhiq47toVmd@ep-floral-cell-a5sf2uty.us-east-2.aws.neon.tech/lms-project?sslmode=require",
);

export const db = drizzle(sql);
