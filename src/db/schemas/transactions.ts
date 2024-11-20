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

export const transactions = pgTable(
  "transactions",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    accountId: text("account_id").notNull(),
    categoryId: text("category_id").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    type: text("type").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (transactions) => {
    return {
      userIdIndex: index("transactions_user_id_idx").on(transactions.userId),
      accountIdIndex: index("transactions_account_id_idx").on(
        transactions.accountId,
      ),
      categoryIdIndex: index("transactions_category_id_idx").on(
        transactions.categoryId,
      ),
    };
  },
);

export const insertTransactionsSchema = createInsertSchema(transactions, {
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "The amount must be a valid monetary value",
  }),
  type: z.enum(["income", "expenses", "savings"], {
    errorMap: () => ({
      message: "Type must be either 'income', 'expenses' or 'savings'",
    }),
  }),
});

export const createTransactionSchema = insertTransactionsSchema.omit({
  id: true,
  createdAt: true,
});

export const selectTransactionsSchema = createSelectSchema(transactions);
