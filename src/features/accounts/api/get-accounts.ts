import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
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

export const getAllAccountsQueryOptions = () => {
  return queryOptions({
    queryKey: ["get-all-accounts"],
    queryFn: getAllAccounts,
    staleTime: 1000 * 60 * 5,
  });
};

type UseAllAccountsOptions = {
  queryConfig?: QueryConfig<typeof getAllAccountsQueryOptions>;
};

export function useAllAccounts({ queryConfig }: UseAllAccountsOptions = {}) {
  return useQuery({
    ...getAllAccountsQueryOptions(),
    ...queryConfig,
  });
}
