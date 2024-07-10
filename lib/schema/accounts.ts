import {
  index,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const accounts = pgTable(
  "accounts",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    balance: numeric("balance", { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (accounts) => {
    return {
      userIdIndex: index("accounts_user_id_idx").on(accounts.userId),
    };
  },
);

export const insertAccountsSchema = createInsertSchema(accounts, {
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
});

export const selectAccountsSchema = createSelectSchema(accounts);
