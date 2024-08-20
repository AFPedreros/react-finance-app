import { Hono } from "hono";
import { logger } from "hono/logger";
import { handle } from "hono/vercel";

import { helloRoute } from "../(routes)/hello";

// import { accountsRoute } from "./routes/accounts";

export const config = {
  runtime: "edge",
};

const app = new Hono();

app.use("*", logger());

export const apiRoutes = app.basePath("/api").route("/hello", helloRoute);
// .route("/accounts", accountsRoute);

app.all("*", (c) => c.text("404: Not Found"));

export const GET = handle(app);
export const POST = GET;
export const PUT = GET;
export const PATCH = GET;
export const DELETE = GET;

export default app as never;
export type ApiRoutes = typeof apiRoutes;
