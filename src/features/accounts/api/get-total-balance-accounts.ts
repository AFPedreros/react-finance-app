import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { getOrCreateUUID } from "@/lib/utils";

const userId = getOrCreateUUID();

async function getTotalAccounts() {
  const response = await api.accounts.total.$get({
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("Server error");
  }

  const total = await response.json();

  return total;
}

export const getTotalBalanceAccountsQueryOptions = () => {
  return queryOptions({
    queryKey: ["get-total-accounts"],
    queryFn: getTotalAccounts,
    staleTime: 1000 * 60 * 5,
  });
};

type UseTotalBalanceAccountsOptions = {
  queryConfig?: QueryConfig<typeof getTotalBalanceAccountsQueryOptions>;
};

export function useTotalBalanceAccounts({
  queryConfig,
}: UseTotalBalanceAccountsOptions = {}) {
  return useQuery({
    ...getTotalBalanceAccountsQueryOptions(),
    ...queryConfig,
  });
}
