import { api } from "@/lib/api-client";
import { getOrCreateUUID } from "@/lib/utils";

const userId = getOrCreateUUID();

export async function deleteAccount({ id }: { id: number }) {
  const response = await api.accounts[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("server error");
  }

  const deletedAccount = await response.json();

  return deletedAccount;
}
