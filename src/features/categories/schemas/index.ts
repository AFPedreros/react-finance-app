import { createCategorySchema } from "@/db/schemas";

export const createCategoryFormSchema = createCategorySchema.omit({
  userId: true,
});

export const updateCategoryFormSchema = createCategorySchema.omit({
  userId: true,
});
