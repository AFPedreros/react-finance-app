import { createAccountSchema } from "@/db/schemas";

export const createAccountFormSchema = createAccountSchema.omit({
  userId: true,
});

export const updateFormSchema = createAccountSchema.omit({ userId: true });
