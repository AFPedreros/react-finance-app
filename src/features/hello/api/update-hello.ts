import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import {
  getHelloQueryOptions,
  getLoadingCreateHelloQueryOptions,
} from "./get-hello";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

type UseUpdateHelloOptions = {
  mutationConfig?: MutationConfig<typeof updateHello>;
};

export const updateHelloInputSchema = z.object({
  message: z.string().min(1, "Required"),
});

export type UpdateHelloInput = z.infer<typeof updateHelloInputSchema>;

export const updateHello = async ({ data }: { data: UpdateHelloInput }) => {
  const response = await api.hello.$patch({ json: data });

  if (!response.ok) {
    const error = await response.text();

    throw new Error(error);
  }

  return response.json();
};

export const useUpdateHello = ({
  mutationConfig,
}: UseUpdateHelloOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onMutate: async (variables: { data: UpdateHelloInput }) => {
      await queryClient.cancelQueries({
        queryKey: getHelloQueryOptions("").queryKey,
      });

      const existingHello = queryClient.getQueryData<{ message: string }>(
        getHelloQueryOptions("").queryKey,
      );

      queryClient.setQueryData<{ message: string }>(
        getHelloQueryOptions("").queryKey,
        {
          message: variables.data.message,
        },
      );
      queryClient.setQueryData(getLoadingCreateHelloQueryOptions().queryKey, {
        loading: true,
      });

      return { existingHello, newHello: variables };
    },
    onError: (error, _newHello, context) => {
      if (
        context &&
        typeof context === "object" &&
        "existingHello" in context
      ) {
        queryClient.setQueryData(
          getHelloQueryOptions("").queryKey,
          (context as { existingHello?: { message: string } }).existingHello,
        );
      }
      onError?.(error, _newHello, context);
    },
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onSettled: () => {
      queryClient.setQueryData(getLoadingCreateHelloQueryOptions().queryKey, {
        loading: false,
      });
    },
    ...restConfig,
    mutationFn: updateHello,
  });
};
