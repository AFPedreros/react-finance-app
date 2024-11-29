import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getAllTransactionsQueryOptions } from "./get-transactions";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getOrCreateUUID } from "@/lib/utils";

const userId = getOrCreateUUID();

export async function deleteTransaction({ id }: { id: number }) {
  const response = await api.transactions[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("server error");
  }

  const deletedTransaction = await response.json();

  return deletedTransaction;
}

type UseDeleteTransactionOptions = {
  mutationConfig?: MutationConfig<typeof deleteTransaction>;
};

export const useDeleteTransaction = ({
  mutationConfig,
}: UseDeleteTransactionOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, onError, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onMutate: async (variables: { id: number }) => {
      await queryClient.cancelQueries({
        queryKey: getAllTransactionsQueryOptions().queryKey,
      });

      const existingTransactions = await queryClient.ensureQueryData(
        getAllTransactionsQueryOptions(),
      );

      const newTransactions = existingTransactions.filter(
        (transaction) => transaction.id !== variables.id,
      );

      queryClient.setQueryData(
        getAllTransactionsQueryOptions().queryKey,
        newTransactions,
      );

      const deletedTransaction = existingTransactions.find(
        (transaction) => transaction.id === variables.id,
      );

      return { existingTransactions, deletedTransaction };
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
      await queryClient.invalidateQueries({
        queryKey: getAllTransactionsQueryOptions().queryKey,
      });
    },
    mutationFn: deleteTransaction,
    ...restConfig,
  });
};
