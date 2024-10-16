import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getAllCategoriesQueryOptions } from "./get-categories";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Category } from "@/types";

export async function updateCategory({ data }: { data: Category }) {
  if (!data.id) throw new Error("No id provided");

  const response = await api.categories[":id{[0-9]+}"].$patch({
    param: { id: data.id?.toString() },
    json: { ...data },
  });

  if (!response.ok) {
    throw new Error("server error");
  }

  const updatedCategory = await response.json();

  return updatedCategory;
}

type UseUpdateCategoryOptions = {
  mutationConfig?: MutationConfig<typeof updateCategory>;
};

export const useUpdateCategory = ({
  mutationConfig,
}: UseUpdateCategoryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, onError, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onMutate: async (variables: { data: Category }) => {
      await queryClient.cancelQueries({
        queryKey: getAllCategoriesQueryOptions().queryKey,
      });

      const existingCategories = await queryClient.ensureQueryData(
        getAllCategoriesQueryOptions(),
      );

      const updatedCategory = {
        ...variables.data,
        id: variables.data.id ?? 9999,
        createdAt: variables.data.createdAt
          ? new Date(variables.data.createdAt)
          : new Date(),
      };

      const newCategories = existingCategories.map((item) =>
        item.id === updatedCategory.id ? updatedCategory : item,
      );

      queryClient.setQueryData(
        getAllCategoriesQueryOptions().queryKey,
        newCategories,
      );

      return { existingCategories };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        getAllCategoriesQueryOptions().queryKey,
        // @ts-ignore
        context?.existingCategories,
      );

      onError?.(error, variables, context);
    },
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onSettled: async () => {
      const existingCategories = await queryClient.ensureQueryData(
        getAllCategoriesQueryOptions(),
      );

      queryClient.setQueryData(getAllCategoriesQueryOptions().queryKey, [
        ...(existingCategories || []),
      ]);
    },
    mutationFn: updateCategory,
    ...restConfig,
  });
};
