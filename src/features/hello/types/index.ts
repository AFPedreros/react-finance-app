import { z } from "zod";

import { updateHelloFormSchema } from "../schemas";

export type UpdateHelloForm = z.infer<typeof updateHelloFormSchema>;
