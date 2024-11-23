import { Hono } from "hono";
import { logger } from "hono/logger";
import { handle } from "hono/vercel";

import { accountsRoute } from "./routes/accounts";
import { categoriesRoute } from "./routes/categories";
import { helloRoute } from "./routes/hello";
import { transactionsRoute } from "./routes/transactions";

export const runtime = "edge";

const app = new Hono();

app.use("*", logger());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiRoutes = app
  .basePath("/api")
  .route("/hello", helloRoute)
  .route("/accounts", accountsRoute)
  .route("/categories", categoriesRoute)
  .route("/transactions", transactionsRoute);

app.all("*", (c) => c.text("404: Not Found"));

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type ApiRoutes = typeof apiRoutes;
