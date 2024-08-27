import { isServer } from "@tanstack/react-query";

import { env } from "@/config/env";

export function getBaseURL() {
  if (!isServer) {
    return "";
  }
  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
