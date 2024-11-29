import { queryOptions, useQuery } from "@tanstack/react-query";

import { TransactionType } from "../types";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { getOrCreateUUID } from "@/lib/utils";

const userId = getOrCreateUUID();

async function getTotalTransactions(type: TransactionType) {
  const response = await api.transactions.total[type].$get({
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("Server error");
  }

  const total = await response.json();

  return total;
}

export const getTotalTransactionsQueryOptions = (type: TransactionType) => {
  return queryOptions({
    queryKey: ["get-total-transactions", type],
    queryFn: () => getTotalTransactions(type),
    staleTime: 1000 * 60 * 5,
  });
};

type UseTotalTransactionsOptions = {
  type: TransactionType;
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
