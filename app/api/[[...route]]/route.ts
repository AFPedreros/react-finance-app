import { Hono } from "hono";
import { handle } from "hono/vercel";

import { accountsRoute } from "./routes/accounts";
import { expensesRoute } from "./routes/expenses";

export const runtime = "edge";

const app = new Hono();

const apiRoutes = app
  .basePath("/api")
  .route("/accounts", accountsRoute)
  .route("/expenses", expensesRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type ApiRoutes = typeof apiRoutes;
