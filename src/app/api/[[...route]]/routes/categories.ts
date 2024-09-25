import { zValidator } from "@hono/zod-validator";
import { and, count, desc, eq } from "drizzle-orm";
import { Hono } from "hono";

import { db } from "@/db";
import {
  categories as categoriesTable,
  createCategorySchema,
  insertCategoriesSchema,
  userIdSchema,
} from "@/db/schemas";

export const categoriesRoute = new Hono()
  .get("/", zValidator("query", userIdSchema), async (c) => {
    const { userId } = c.req.valid("query");

    const categories = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.userId, userId))
      .orderBy(desc(categoriesTable.createdAt))
      .limit(100);

    return c.json(categories, 200);
  })
  .get("/:id{[0-9]+}", zValidator("query", userIdSchema), async (c) => {
    const { userId } = c.req.valid("query");
    const id = Number.parseInt(c.req.param("id"), 10);

    if (isNaN(id)) {
      return c.json({ error: "Invalid id" }, 400);
    }

    const [category] = await db
      .select()
      .from(categoriesTable)
      .where(
        and(eq(categoriesTable.userId, userId), eq(categoriesTable.id, id)),
      );

    if (!category) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json(category, 200);
  })
  .get("/count", zValidator("query", userIdSchema), async (c) => {
    const { userId } = c.req.valid("query");

    const [result] = await db
      .select({ totalCategories: count() })
      .from(categoriesTable)
      .where(eq(categoriesTable.userId, userId));

    return c.json(result, 200);
  })
  .post("/", zValidator("json", createCategorySchema), async (c) => {
    const category = c.req.valid("json");

    try {
      const validatedCategory = insertCategoriesSchema.parse({
        ...category,
      });

      const [newCategory] = await db
        .insert(categoriesTable)
        .values(validatedCategory)
        .returning();

      return c.json(newCategory, 201);
    } catch (error) {
      return c.json({ error: "Validation failed", details: error }, 400);
    }
  })
  .patch(
    "/:id{[0-9]+}",
    zValidator("json", createCategorySchema),
    async (c) => {
      const category = c.req.valid("json");
      const id = Number.parseInt(c.req.param("id"), 10);

      if (isNaN(id)) {
        return c.json({ error: "Invalid id" }, 400);
      }

      try {
        const validatedCategory = insertCategoriesSchema.parse({
          ...category,
        });

        const [updatedCategory] = await db
          .update(categoriesTable)
          .set(validatedCategory)
          .where(eq(categoriesTable.id, id))
          .returning();

        if (!updatedCategory) {
          return c.json({ error: "Not found" }, 404);
        }

        return c.json(updatedCategory, 200);
      } catch (error) {
        return c.json({ error: "Validation failed", details: error }, 400);
      }
    },
  )
  .delete("/:id{[0-9]+}", zValidator("query", userIdSchema), async (c) => {
    const { userId } = c.req.valid("query");
    const id = Number.parseInt(c.req.param("id"), 10);

    if (isNaN(id)) {
      return c.json({ error: "Invalid id" }, 400);
    }

    const [deletedCategory] = await db
      .delete(categoriesTable)
      .where(
        and(eq(categoriesTable.userId, userId), eq(categoriesTable.id, id)),
      )
      .returning();

    if (!deletedCategory) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json(deletedCategory, 200);
  });
