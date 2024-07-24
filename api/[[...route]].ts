import { Hono } from "hono";
import { logger } from "hono/logger";
import { handle } from "hono/vercel";

import { accountsRoute } from "./routes/accounts";
import { helloRoute } from "./routes/hello";

export const config = {
  runtime: "edge",
};

const app = new Hono();

app.use("*", logger());

const apiRoutes = app
  .basePath("/api")
  .route("/hello", helloRoute)
  .route("/accounts", accountsRoute);

app.all("*", (c) => c.text("404: Not Found"));

// Register the handler for Vercel Edge Functions
export const GET = handle(app);
export const POST = GET;
export const PUT = GET;
export const PATCH = GET;
export const DELETE = GET;

export default app;
export type ApiRoutes = typeof apiRoutes;
