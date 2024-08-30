import { queryOptions, useQuery } from "@tanstack/react-query";

import { UseHelloOptions } from "../types";

import { api } from "@/lib/api-client";

export async function getHello(message: string) {
  const response = await api.hello.$get({ query: { message } });

  if (!response.ok) {
    throw new Error("Server error");
  }

  const data = await response.json();

  return data;
}

export const getHelloQueryOptions = (message: string) => {
  return queryOptions({
    queryKey: ["get-hello"],
    queryFn: () => getHello(message),
    staleTime: 1000 * 60 * 60,
  });
};

export const getLoadingCreateHelloQueryOptions = () => {
  return queryOptions<{
    loading?: boolean;
  }>({
    queryKey: ["loading-create-hello"],
    queryFn: async () => {
      return {};
    },
    staleTime: Infinity,
  });
};

export function useHello({ queryConfig, message }: UseHelloOptions) {
  return useQuery({
    ...getHelloQueryOptions(message),
    ...queryConfig,
  });
}
