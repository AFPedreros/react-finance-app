import { z } from "zod";

import { createCategorySchema, insertCategoriesSchema } from "@/db/schemas";

export type Category = z.infer<typeof insertCategoriesSchema>;
export type CreateCategory = z.infer<typeof createCategorySchema>;
