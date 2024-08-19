import { zValidator } from "@hono/zod-validator";
import { and, desc, eq, sum } from "drizzle-orm";
import { Hono } from "hono";

import { db } from "../../db";
import {
  accounts as accountsTable,
  createAccountSchema,
  insertAccountsSchema,
  userIdSchema,
} from "../../db/schemas";

export const accountsRoute = new Hono()
  .get("/", zValidator("query", userIdSchema), async (c) => {
    const { userId } = c.req.valid("query");

    console.log("DB", db);

    const expenses = await db
      .select()
      .from(accountsTable)
      .where(eq(accountsTable.userId, userId))
      .orderBy(desc(accountsTable.createdAt))
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
      .from(accountsTable)
      .where(and(eq(accountsTable.userId, userId), eq(accountsTable.id, id)));

    if (!expense) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json(expense);
  })
  .get("/total", zValidator("query", userIdSchema), async (c) => {
    const { userId } = c.req.valid("query");

    if (!userId) {
      return c.json({ error: "Invalid user id" }, 400);
    }

    const [result] = await db
      .select({ totalBalance: sum(accountsTable.balance) })
      .from(accountsTable)
      .where(eq(accountsTable.userId, userId))
      .limit(1);

    return c.json(result);
  })
  .post("/", zValidator("json", createAccountSchema), async (c) => {
    const expense = c.req.valid("json");
    const validatedExpense = insertAccountsSchema.parse({
      ...expense,
    });

    const [newExpense] = await db
      .insert(accountsTable)
      .values(validatedExpense)
      .returning();

    return c.json(newExpense, 201);
  })
  .patch("/:id{[0-9]+}", zValidator("json", createAccountSchema), async (c) => {
    const expense = c.req.valid("json");
    const id = Number.parseInt(c.req.param("id"));

    if (!id) {
      return c.json({ error: "Invalid id" }, 400);
    }

    const validatedExpense = insertAccountsSchema.parse({
      ...expense,
    });

    const [updatedExpense] = await db
      .update(accountsTable)
      .set(validatedExpense)
      .where(eq(accountsTable.id, id))
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
      .delete(accountsTable)
      .where(and(eq(accountsTable.userId, userId), eq(accountsTable.id, id)))
      .returning();

    if (!expense) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json(expense);
  });
