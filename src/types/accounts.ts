import { z } from "zod";

import { createAccountSchema, insertAccountsSchema } from "@/db/schemas";

export type Account = z.infer<typeof insertAccountsSchema>;
export type CreateAccount = z.infer<typeof createAccountSchema>;
