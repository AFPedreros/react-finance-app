import { z } from "zod";

import { createAccountFormSchema } from "../schemas";

export type CreateAccountInputs = z.infer<typeof createAccountFormSchema>;
