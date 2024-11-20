import { zValidator } from "@hono/zod-validator";
import { and, desc, eq } from "drizzle-orm";
import { Hono } from "hono";

import { db } from "@/db";
import {
  createTransactionSchema,
  insertTransactionsSchema,
  transactions as transactionsTable,
  userIdSchema,
} from "@/db/schemas";

export const transactionsRoute = new Hono()
  .get("/", zValidator("query", userIdSchema), async (c) => {
    const { userId } = c.req.valid("query");

    const transactions = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.userId, userId))
      .orderBy(desc(transactionsTable.createdAt))
      .limit(100);

    return c.json(transactions, 200);
  })
  .get("/:id{[0-9]+}", zValidator("query", userIdSchema), async (c) => {
    const { userId } = c.req.valid("query");
    const id = Number.parseInt(c.req.param("id"), 10);

    if (isNaN(id)) {
      return c.json({ error: "Invalid id" }, 400);
    }

    const [transaction] = await db
      .select()
      .from(transactionsTable)
      .where(
        and(eq(transactionsTable.userId, userId), eq(transactionsTable.id, id)),
      );

    if (!transaction) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json(transaction, 200);
  })
  .post("/", zValidator("json", createTransactionSchema), async (c) => {
    const transaction = c.req.valid("json");

    try {
      const validatedTransaction = insertTransactionsSchema.parse({
        ...transaction,
      });

      const [newTransaction] = await db
        .insert(transactionsTable)
        .values(validatedTransaction)
        .returning();

      return c.json(newTransaction, 201);
    } catch (error) {
      return c.json({ error: "Validation failed", details: error }, 400);
    }
  })
  .patch(
    "/:id{[0-9]+}",
    zValidator("json", createTransactionSchema),
    async (c) => {
      const transaction = c.req.valid("json");
      const id = Number.parseInt(c.req.param("id"), 10);

      if (isNaN(id)) {
        return c.json({ error: "Invalid id" }, 400);
      }

      try {
        const validatedTransaction = insertTransactionsSchema.parse({
          ...transaction,
        });

        const [updatedTransaction] = await db
          .update(transactionsTable)
          .set(validatedTransaction)
          .where(eq(transactionsTable.id, id))
          .returning();

        if (!updatedTransaction) {
          return c.json({ error: "Not found" }, 404);
        }

        return c.json(updatedTransaction, 200);
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

    const [deletedTransaction] = await db
      .delete(transactionsTable)
      .where(
        and(eq(transactionsTable.userId, userId), eq(transactionsTable.id, id)),
      )
      .returning();

    if (!deletedTransaction) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json(deletedTransaction, 200);
  });
