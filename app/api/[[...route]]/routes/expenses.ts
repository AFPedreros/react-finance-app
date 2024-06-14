import { zValidator } from "@hono/zod-validator";
import { and, desc, eq, sum } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "../db";

import {
  expenses as expensesTable,
  insertExpensesSchema,
} from "@/lib/schema/expenses";
import { createExpenseSchema } from "@/types";

const userIdSchema = z.object({
  userId: z.string(),
});

export const expensesRoute = new Hono()
  .get("/", zValidator("query", userIdSchema), async (c) => {
    const { userId } = c.req.valid("query");

    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, userId))
      .orderBy(desc(expensesTable.createdAt))
      .limit(100);

    return c.json(expenses);
  })
  .get("/:id{[0-9]+}", zValidator("query", userIdSchema), async (c) => {
    const { userId } = c.req.valid("query");
    const id = Number.parseInt(c.req.param("id"));

    if (!id) {
      return c.json({ error: "Invalid id" }, 400);
    }

    if (!userId) {
      return c.json({ error: "Invalid user id" }, 400);
    }

    const [expense] = await db
      .select()
      .from(expensesTable)
      .where(and(eq(expensesTable.userId, userId), eq(expensesTable.id, id)));

    if (!expense) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json(expense);
  })
  .get("/total-spent", zValidator("query", userIdSchema), async (c) => {
    const { userId } = c.req.valid("query");

    if (!userId) {
      return c.json({ error: "Invalid user id" }, 400);
    }

    const [result] = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, userId))
      .limit(1);

    return c.json(result);
  })
  .post("/", zValidator("json", createExpenseSchema), async (c) => {
    const expense = c.req.valid("json");
    const validatedExpense = insertExpensesSchema.parse({
      ...expense,
    });

    const [newExpense] = await db
      .insert(expensesTable)
      .values(validatedExpense)
      .returning();

    return c.json(newExpense, 201);
  })
  .patch("/:id{[0-9]+}", zValidator("json", createExpenseSchema), async (c) => {
    const expense = c.req.valid("json");
    const id = Number.parseInt(c.req.param("id"));

    if (!id) {
      return c.json({ error: "Invalid id" }, 400);
    }

    const validatedExpense = insertExpensesSchema.parse({
      ...expense,
    });

    const [updatedExpense] = await db
      .update(expensesTable)
      .set(validatedExpense)
      .where(eq(expensesTable.id, id))
      .returning();

    if (!updatedExpense) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json(updatedExpense);
  })
  .delete("/:id{[0-9]+}", zValidator("query", userIdSchema), async (c) => {
    const { userId } = c.req.valid("query");
    const id = Number.parseInt(c.req.param("id"));

    if (!id) {
      return c.json({ error: "Invalid id" }, 400);
    }

    if (!userId) {
      return c.json({ error: "Invalid user id" }, 400);
    }

    const [expense] = await db
      .delete(expensesTable)
      .where(and(eq(expensesTable.userId, userId), eq(expensesTable.id, id)))
      .returning();

    if (!expense) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json(expense);
  });
