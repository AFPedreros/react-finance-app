import { z } from "zod";

import { createAccountSchema } from "../db/schemas";

export type CreateAccount = z.infer<typeof createAccountSchema>;
