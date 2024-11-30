import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getAllTransactionsQueryOptions } from "./get-transactions";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Transaction } from "@/types";

export async function updateTransaction({ data }: { data: Transaction }) {
  if (!data.id) throw new Error("No id provided");

  const response = await api.transactions[":id{[0-9]+}"].$patch({
    param: { id: data.id?.toString() },
    json: { ...data },
  });

  if (!response.ok) {
    throw new Error("server error");
  }

  const updatedTransaction = await response.json();

  return updatedTransaction;
}

type UseUpdateTransactionOptions = {
  mutationConfig?: MutationConfig<typeof updateTransaction>;
};

export const useUpdateTransaction = ({
  mutationConfig,
}: UseUpdateTransactionOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, onError, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onMutate: async (variables: { data: Transaction }) => {
      await queryClient.cancelQueries({
        queryKey: getAllTransactionsQueryOptions().queryKey,
      });

      const existingTransactions = await queryClient.ensureQueryData(
        getAllTransactionsQueryOptions(),
      );

      const updatedTransaction = {
        ...variables.data,
        id: variables.data.id ?? 9999,
        createdAt: variables.data.createdAt
          ? new Date(variables.data.createdAt)
          : new Date(),
      };

      const newTransactions = existingTransactions.map((item) =>
        item.id === updatedTransaction.id ? updatedTransaction : item,
      );

      queryClient.setQueryData(
        getAllTransactionsQueryOptions().queryKey,
        newTransactions,
      );

      return { existingTransactions };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        getAllTransactionsQueryOptions().queryKey,
        // @ts-ignore
        context?.existingTransactions,
      );

      onError?.(error, variables, context);
    },
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onSettled: async () => {
      const existingTransactions = await queryClient.ensureQueryData(
        getAllTransactionsQueryOptions(),
      );

      queryClient.setQueryData(getAllTransactionsQueryOptions().queryKey, [
        ...(existingTransactions || []),
      ]);
    },
    mutationFn: updateTransaction,
    ...restConfig,
  });
};
