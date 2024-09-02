import { queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { getOrCreateUUID } from "@/lib/utils";

const userId = getOrCreateUUID();

async function getAllAccounts() {
  const response = await api.accounts.$get({
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("Server error");
  }

  const accounts = await response.json();

  return accounts;
}

export const getAllAccountsQueryOptions = queryOptions({
  queryKey: ["get-all-accounts"],
  queryFn: getAllAccounts,
  staleTime: 1000 * 60 * 5,
});
