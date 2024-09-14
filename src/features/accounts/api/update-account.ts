import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getAllAccountsQueryOptions } from "./get-accounts";
import { getTotalBalanceAccountsQueryOptions } from "./get-total-balance-accounts";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Account } from "@/types";

export async function updateAccount({ data }: { data: Account }) {
  if (!data.id) throw new Error("No id provided");

  const response = await api.accounts[":id{[0-9]+}"].$patch({
    param: { id: data.id?.toString() },
    json: { ...data },
  });

  if (!response.ok) {
    throw new Error("server error");
  }

  const updatedAccount = await response.json();

  return updatedAccount;
}

type UseUpdateAccountOptions = {
  mutationConfig?: MutationConfig<typeof updateAccount>;
};

export const useUpdateAccount = ({
  mutationConfig,
}: UseUpdateAccountOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, onError, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onMutate: async (variables: { data: Account }) => {
      await queryClient.cancelQueries({
        queryKey: getAllAccountsQueryOptions().queryKey,
      });

      const existingAccounts = await queryClient.ensureQueryData(
        getAllAccountsQueryOptions(),
      );

      const updatedAccount = {
        ...variables.data,
        id: variables.data.id ?? 9999,
        createdAt:
          variables.data.createdAt?.toString() ?? new Date().toISOString(),
      };

      const newAccounts = existingAccounts.map((item) =>
        item.id === updatedAccount.id ? updatedAccount : item,
      );

      queryClient.setQueryData(
        getAllAccountsQueryOptions().queryKey,
        newAccounts,
      );

      const oldTotalBalance = await queryClient.ensureQueryData(
        getTotalBalanceAccountsQueryOptions(),
      );

      queryClient.setQueryData(
        getTotalBalanceAccountsQueryOptions().queryKey,
        () => {
          const oldAccount = existingAccounts.find(
            (item) => item.id === updatedAccount.id,
          );
          const oldBalance = oldAccount ? Number(oldAccount.balance) : 0;
          const newBalance = Number(updatedAccount.balance);
          const newTotal =
            Number(oldTotalBalance?.totalBalance) - oldBalance + newBalance;

          return { totalBalance: newTotal.toString() };
        },
      );

      return { existingAccounts, oldTotalBalance };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        getAllAccountsQueryOptions().queryKey,
        // @ts-ignore
        context?.existingAccounts,
      );

      queryClient.setQueryData(
        getTotalBalanceAccountsQueryOptions().queryKey,
        // @ts-ignore
        context?.oldTotalBalance,
      );

      onError?.(error, variables, context);
    },
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onSettled: async () => {
      const existingAccounts = await queryClient.ensureQueryData(
        getAllAccountsQueryOptions(),
      );

      queryClient.setQueryData(getAllAccountsQueryOptions().queryKey, [
        ...(existingAccounts || []),
      ]);
    },
    mutationFn: updateAccount,
    ...restConfig,
  });
};
