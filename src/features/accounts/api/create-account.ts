import { queryOptions } from "@tanstack/react-query";

import { CreateAccount } from "@db/types/account";

import { api } from "@/lib/api-client";

export async function createAccount({ values }: { values: CreateAccount }) {
  const response = await api.accounts.$post({
    json: { ...values },
  });

  if (!response.ok) {
    throw new Error("Error creating account");
  }

  const newAccount = await response.json();

  return newAccount;
}

export const loadingCreateAccountQueryOptions = queryOptions<{
  account?: CreateAccount;
}>({
  queryKey: ["loading-create-account"],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});
