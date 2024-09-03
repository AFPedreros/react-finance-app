import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

const messageSchema = z.object({
  message: z.string().min(1),
});

let hello = "Client hello from Hono!";

export const helloRoute = new Hono()
  .get("/", zValidator("query", messageSchema), async (c) => {
    const { message } = c.req.valid("query");

    return c.json({
      message: `${message} ${hello}`,
    });
  })
  .patch("/", zValidator("json", messageSchema), async (c) => {
    const { message } = c.req.valid("json");

    await delay(1000);

    if (Math.random() < 0.5) {
      throw new HTTPException(400, {
        message: "Error occurred during patch operation",
      });
    }

    hello = message;

    return c.json({
      message: `${hello}`,
    });
  });

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
