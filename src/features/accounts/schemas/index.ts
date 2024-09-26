import { createAccountSchema } from "@/db/schemas";

export const createAccountFormSchema = createAccountSchema.omit({
  userId: true,
});

export const updateAccountFormSchema = createAccountSchema.omit({
  userId: true,
});
