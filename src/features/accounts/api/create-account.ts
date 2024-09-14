import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { getAllAccountsQueryOptions } from "./get-accounts";
import { getTotalBalanceAccountsQueryOptions } from "./get-total-balance-accounts";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { CreateAccount } from "@/types";

export async function createAccount({ data }: { data: CreateAccount }) {
  const response = await api.accounts.$post({
    json: { ...data },
  });

  if (!response.ok) {
    throw new Error("Error creating account");
  }

  const newAccount = await response.json();

  return newAccount;
}

export const loadingCreateAccountQueryOptions = () => {
  return queryOptions<{
    account?: CreateAccount;
  }>({
    queryKey: ["loading-create-account"],
    queryFn: async () => {
      return {};
    },
    staleTime: Infinity,
  });
};

type UseCreateAccountOptions = {
  mutationConfig?: MutationConfig<typeof createAccount>;
};

export const useCreateAccount = ({
  mutationConfig,
}: UseCreateAccountOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, onError, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onMutate: async (variables: { data: CreateAccount }) => {
      await queryClient.cancelQueries({
        queryKey: getAllAccountsQueryOptions().queryKey,
      });

      const existingAccounts = await queryClient.ensureQueryData(
        getAllAccountsQueryOptions(),
      );

      queryClient.setQueryData(loadingCreateAccountQueryOptions().queryKey, {
        account: variables.data,
      });

      const totalBalance =
        parseFloat(variables.data.balance) +
        (existingAccounts
          ? existingAccounts.reduce(
              (acc, account) => acc + parseFloat(account.balance),
              0,
            )
          : 0);

      queryClient.setQueryData(getTotalBalanceAccountsQueryOptions().queryKey, {
        totalBalance: totalBalance.toString(),
      });

      return { existingAccounts, newAccount: variables.data };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        getAllAccountsQueryOptions().queryKey,
        // @ts-ignore
        context?.existingAccounts,
      );

      if (variables) {
        queryClient.setQueryData(
          getTotalBalanceAccountsQueryOptions().queryKey,
          (oldTotalBalance) => {
            const addedBalance = Number(variables.data.balance);
            const newTotal =
              Number(oldTotalBalance?.totalBalance) - addedBalance;

            return { totalBalance: newTotal.toString() };
          },
        );
      }

      onError?.(error, variables, context);
    },
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onSettled: async (newAccount) => {
      queryClient.setQueryData(loadingCreateAccountQueryOptions().queryKey, {});
      const existingAccounts = await queryClient.ensureQueryData(
        getAllAccountsQueryOptions(),
      );

      if (newAccount) {
        queryClient.setQueryData(getAllAccountsQueryOptions().queryKey, [
          newAccount,
          ...(existingAccounts || []),
        ]);
      }
    },
    mutationFn: createAccount,
    ...restConfig,
  });
};
