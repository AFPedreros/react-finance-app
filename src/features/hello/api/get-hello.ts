import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

export async function getHello() {
  const response = await api.hello.$get();

  if (!response.ok) {
    throw new Error("Server error");
  }

  const data = await response.json();

  return data;
}

export const getHelloQueryOptions = () => {
  return queryOptions({
    queryKey: ["get-hello"],
    queryFn: getHello,
  });
};

type UseHelloOptions = {
  queryConfig?: QueryConfig<typeof getHelloQueryOptions>;
};

export function useHello({ queryConfig }: UseHelloOptions = {}) {
  return useQuery({ ...getHelloQueryOptions(), ...queryConfig });
}
