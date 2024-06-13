import { SVGProps } from "react";
import { z } from "zod";

import { insertExpensesSchema } from "@/lib/schema/expenses";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const createExpenseSchema = insertExpensesSchema.omit({
  createdAt: true,
  id: true,
});

export type Expense = z.infer<typeof insertExpensesSchema>;

export type CreateExpense = z.infer<typeof createExpenseSchema>;
