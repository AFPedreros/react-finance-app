import { z } from "zod";

import {
  createTransactionSchema,
  insertTransactionsSchema,
} from "@/db/schemas";

export type Transaction = z.infer<typeof insertTransactionsSchema>;
export type CreateTransaction = z.infer<typeof createTransactionSchema>;
