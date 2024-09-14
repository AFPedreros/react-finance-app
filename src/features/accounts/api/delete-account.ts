import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getAllAccountsQueryOptions } from "./get-accounts";
import { getTotalBalanceAccountsQueryOptions } from "./get-total-balance-accounts";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getOrCreateUUID } from "@/lib/utils";

const userId = getOrCreateUUID();

export async function deleteAccount({ id }: { id: number }) {
  const response = await api.accounts[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("server error");
  }

  const deletedAccount = await response.json();

  return deletedAccount;
}

type UseDeleteAccountOptions = {
  mutationConfig?: MutationConfig<typeof deleteAccount>;
};

export const useDeleteAccount = ({
  mutationConfig,
}: UseDeleteAccountOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, onError, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onMutate: async (variables: { id: number }) => {
      await queryClient.cancelQueries({
        queryKey: getAllAccountsQueryOptions().queryKey,
      });

      const existingAccounts = await queryClient.ensureQueryData(
        getAllAccountsQueryOptions(),
      );

      const newAccounts = existingAccounts.filter(
        (account) => account.id !== variables.id,
      );

      queryClient.setQueryData(
        getAllAccountsQueryOptions().queryKey,
        newAccounts,
      );

      const deletedAccount = existingAccounts.find(
        (account) => account.id === variables.id,
      );

      queryClient.setQueryData(
        getTotalBalanceAccountsQueryOptions().queryKey,
        (oldTotalBalance) => {
          const deletedBalance = deletedAccount
            ? Number(deletedAccount.balance)
            : 0;
          const newTotal =
            Number(oldTotalBalance?.totalBalance) - deletedBalance;

          return { totalBalance: newTotal.toString() };
        },
      );

      return { existingAccounts, deletedAccount };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        getAllAccountsQueryOptions().queryKey,
        // @ts-ignore
        context?.existingAccounts,
      );

      // @ts-ignore
      if (context?.deletedAccount) {
        queryClient.setQueryData(
          getTotalBalanceAccountsQueryOptions().queryKey,
          (oldTotalBalance) => {
            // @ts-ignore
            const addedBalance = Number(context.deletedAccount?.balance) || 0;
            const newTotal =
              Number(oldTotalBalance?.totalBalance) + addedBalance;

            return { totalBalance: newTotal.toString() };
          },
        );
      }

      onError?.(error, variables, context);
    },
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: getAllAccountsQueryOptions().queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: getTotalBalanceAccountsQueryOptions().queryKey,
      });
    },
    mutationFn: deleteAccount,
    ...restConfig,
  });
};
