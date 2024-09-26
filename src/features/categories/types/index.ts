import { z } from "zod";

import { createCategoryFormSchema, updateCategoryFormSchema } from "../schemas";

export type CreateCategoryInputs = z.infer<typeof createCategoryFormSchema>;
export type UpdateCategoryInputs = z.infer<typeof updateCategoryFormSchema>;
