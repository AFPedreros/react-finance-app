import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { getAllCategoriesQueryOptions } from "./get-categories";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { CreateCategory } from "@/types";

export async function createCategory({ data }: { data: CreateCategory }) {
  const response = await api.categories.$post({
    json: { ...data },
  });

  if (!response.ok) {
    throw new Error("Error creating category");
  }

  const newCategory = await response.json();

  return newCategory;
}

export const loadingCreateCategoryQueryOptions = () => {
  return queryOptions<{
    category?: CreateCategory;
  }>({
    queryKey: ["loading-create-category"],
    queryFn: async () => {
      return {};
    },
    staleTime: Infinity,
  });
};

type UseCreateCategoryOptions = {
  mutationConfig?: MutationConfig<typeof createCategory>;
};

export const useCreateCategory = ({
  mutationConfig,
}: UseCreateCategoryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, onError, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onMutate: async (variables: { data: CreateCategory }) => {
      await queryClient.cancelQueries({
        queryKey: getAllCategoriesQueryOptions().queryKey,
      });

      const existingCategories = await queryClient.ensureQueryData(
        getAllCategoriesQueryOptions(),
      );

      queryClient.setQueryData(loadingCreateCategoryQueryOptions().queryKey, {
        category: variables.data,
      });

      return { existingCategories, newCategory: variables.data };
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
    onSettled: async (newCategory) => {
      queryClient.setQueryData(
        loadingCreateCategoryQueryOptions().queryKey,
        {},
      );
      const existingCategories = await queryClient.ensureQueryData(
        getAllCategoriesQueryOptions(),
      );

      if (newCategory) {
        queryClient.setQueryData(getAllCategoriesQueryOptions().queryKey, [
          {
            ...newCategory,
            createdAt: newCategory.createdAt
              ? new Date(newCategory.createdAt)
              : null,
            type: newCategory.type as "expense" | "income",
          },
          ...(existingCategories || []),
        ]);
      }
    },
    mutationFn: createCategory,
    ...restConfig,
  });
};
