import { z } from "zod";

import { createAccountSchema } from "../schemas";

export type CreateAccount = z.infer<typeof createAccountSchema>;
