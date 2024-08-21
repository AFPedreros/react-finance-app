import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getHelloQueryOptions,
  getLoadingCreateHelloQueryOptions,
} from "./get-hello";

import { api } from "@/lib/api-client";

export async function updateHello(message: string) {
  const response = await api.hello.$patch({ json: { message } });

  if (!response.ok) {
    const error = await response.text();

    throw new Error(error);
  }

  const newHello = await response.json();

  return newHello;
}

export function useHelloMutation(queryClient: QueryClient) {
  return useMutation({
    mutationFn: (message: string) => updateHello(message),
    onMutate: async (newHello) => {
      await queryClient.cancelQueries({
        queryKey: [getHelloQueryOptions("").queryKey],
      });

      const existingHello = queryClient.getQueryData(
        getHelloQueryOptions("").queryKey,
      );

      queryClient.setQueryData(getHelloQueryOptions("").queryKey, {
        message: newHello,
      });
      queryClient.setQueryData(getLoadingCreateHelloQueryOptions().queryKey, {
        loading: true,
      });

      return { existingHello, newHello };
    },
    onError: (error, _newHello, context) => {
      queryClient.setQueryData(
        getHelloQueryOptions("").queryKey,
        context?.existingHello,
      );
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Hello created!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [getHelloQueryOptions("").queryKey],
      });
      queryClient.setQueryData(getLoadingCreateHelloQueryOptions().queryKey, {
        loading: false,
      });
    },
  });
}
