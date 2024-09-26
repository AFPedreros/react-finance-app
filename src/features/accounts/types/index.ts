import { z } from "zod";

import { createAccountFormSchema, updateAccountFormSchema } from "../schemas";

export type CreateAccountInputs = z.infer<typeof createAccountFormSchema>;
export type UpdateAccountInputs = z.infer<typeof updateAccountFormSchema>;
