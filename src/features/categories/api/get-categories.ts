import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { getOrCreateUUID } from "@/lib/utils";

const userId = getOrCreateUUID();

async function getAllCategories() {
  const response = await api.categories.$get({
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("Server error");
  }

  const categories = await response.json();

  return categories;
}

export const getAllCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ["get-all-categories"],
    queryFn: getAllCategories,
    staleTime: 1000 * 60 * 5,
  });
};

type UseAllCategoriesOptions = {
  queryConfig?: QueryConfig<typeof getAllCategoriesQueryOptions>;
};

export function useAllCategories({
  queryConfig,
}: UseAllCategoriesOptions = {}) {
  return useQuery({
    ...getAllCategoriesQueryOptions(),
    ...queryConfig,
  });
}
