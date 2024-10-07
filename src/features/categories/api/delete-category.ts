import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getAllCategoriesQueryOptions } from "./get-categories";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getOrCreateUUID } from "@/lib/utils";

const userId = getOrCreateUUID();

export async function deleteCategory({ id }: { id: number }) {
  const response = await api.categories[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("server error");
  }

  const deletedCategory = await response.json();

  return deletedCategory;
}

type UseDeleteCategoryOptions = {
  mutationConfig?: MutationConfig<typeof deleteCategory>;
};

export const useDeleteCategory = ({
  mutationConfig,
}: UseDeleteCategoryOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, onError, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onMutate: async (variables: { id: number }) => {
      await queryClient.cancelQueries({
        queryKey: getAllCategoriesQueryOptions().queryKey,
      });

      const existingAccounts = await queryClient.ensureQueryData(
        getAllCategoriesQueryOptions(),
      );

      const newAccounts = existingAccounts.filter(
        (account) => account.id !== variables.id,
      );

      queryClient.setQueryData(
        getAllCategoriesQueryOptions().queryKey,
        newAccounts,
      );

      const deletedAccount = existingAccounts.find(
        (account) => account.id === variables.id,
      );

      return { existingAccounts, deletedAccount };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        getAllCategoriesQueryOptions().queryKey,
        // @ts-ignore
        context?.existingAccounts,
      );

      onError?.(error, variables, context);
    },
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: getAllCategoriesQueryOptions().queryKey,
      });
    },
    mutationFn: deleteCategory,
    ...restConfig,
  });
};
