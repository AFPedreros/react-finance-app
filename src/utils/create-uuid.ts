import { v4 as uuidv4 } from "uuid";

export function getOrCreateUUID() {
  let uuid = "";

  if (typeof window !== "undefined") {
    uuid = localStorage.getItem("expenses-user-uuid") ?? "";

    if (!uuid) {
      uuid = uuidv4();
      localStorage.setItem("expenses-user-uuid", uuid);
    }
  }

  return uuid;
}
