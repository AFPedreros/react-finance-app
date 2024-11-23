import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { getOrCreateUUID } from "@/lib/utils";

const userId = getOrCreateUUID();

async function getTotalTransactions(type: keyof typeof api.transactions.total) {
  const response = await api.transactions.total[type].$get({
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("Server error");
  }

  const total = await response.json();

  return total;
}

export const getTotalTransactionsQueryOptions = (
  type: keyof typeof api.transactions.total,
) => {
  return queryOptions({
    queryKey: ["get-total-transactions", type],
    queryFn: () => getTotalTransactions(type),
    staleTime: 1000 * 60 * 5,
  });
};

type UseTotalTransactionsOptions = {
  type: keyof typeof api.transactions.total;
  queryConfig?: QueryConfig<typeof getTotalTransactionsQueryOptions>;
};

export function useTotalTransactions({
  type,
  queryConfig,
}: UseTotalTransactionsOptions) {
  return useQuery({
    ...getTotalTransactionsQueryOptions(type),
    ...queryConfig,
  });
}
