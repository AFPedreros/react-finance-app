import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { getOrCreateUUID } from "@/lib/utils";
import { Transaction } from "@/types";

const userId = getOrCreateUUID();

async function getAllTransactions() {
  const response = await api.transactions.$get({
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("Server error");
  }

  const transactions = await response.json();

  return transactions as Transaction[];
}

export const getAllTransactionsQueryOptions = () => {
  return queryOptions({
    queryKey: ["get-all-transactions"],
    queryFn: getAllTransactions,
    staleTime: 1000 * 60 * 5,
  });
};

type UseAllTransactionsOptions = {
  queryConfig?: QueryConfig<typeof getAllTransactionsQueryOptions>;
};

export function useAllTransactions({
  queryConfig,
}: UseAllTransactionsOptions = {}) {
  return useQuery({
    ...getAllTransactionsQueryOptions(),
    ...queryConfig,
  });
}
