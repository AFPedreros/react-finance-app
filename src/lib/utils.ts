import { isServer } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

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

export function getOrCreateUUID() {
  let uuid = "";

  if (!isServer) {
    uuid = localStorage.getItem("user-uuid") ?? "";

    if (!uuid) {
      uuid = uuidv4();
      localStorage.setItem("user-uuid", uuid);
    }
  }

  return uuid;
}

export function formatCurrency(
  amount: string,
  locale: string = "en-US",
  currency: string = "USD",
): string {
  const numberAmount = Number(amount);

  return numberAmount.toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
}
