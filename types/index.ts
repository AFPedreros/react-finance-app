import { SVGProps } from "react";
import { z } from "zod";

import { insertAccountsSchema } from "@/lib/schema/accounts";
import { insertExpensesSchema } from "@/lib/schema/expenses";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const createExpenseSchema = insertExpensesSchema.omit({
  id: true,
  createdAt: true,
});
export type Expense = z.infer<typeof insertExpensesSchema>;
export type CreateExpense = z.infer<typeof createExpenseSchema>;

export const createAccountSchema = insertAccountsSchema.omit({
  id: true,
  createdAt: true,
});
export type Account = z.infer<typeof insertAccountsSchema>;
export type CreateAccount = z.infer<typeof createAccountSchema>;
