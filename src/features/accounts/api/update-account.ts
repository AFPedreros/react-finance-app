import { api } from "@/lib/api-client";
import { Account } from "@/types";

export async function updateAccount({ values }: { values: Account }) {
  if (!values.id) throw new Error("No id provided");

  const response = await api.accounts[":id{[0-9]+}"].$patch({
    param: { id: values.id?.toString() },
    json: { ...values },
  });

  if (!response.ok) {
    throw new Error("server error");
  }

  const updatedAccount = await response.json();

  return updatedAccount;
}
