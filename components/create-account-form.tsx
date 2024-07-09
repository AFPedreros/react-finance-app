"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  createAccount,
  getAllAccountsQueryOptions,
  loadingCreateAccountQueryOptions,
} from "@/api-client/accounts";
import { getOrCreateUUID } from "@/lib/utils";
import { createAccountSchema } from "@/types";

const formSchema = createAccountSchema.omit({ userId: true });

export const CreateAccountForm = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  const userId = getOrCreateUUID();

  const {
    formState: { isValid, isSubmitting, dirtyFields, errors },
    control,
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const existingAccounts = await queryClient.ensureQueryData(
      getAllAccountsQueryOptions,
    );

    const data = {
      ...values,
      userId,
    };

    queryClient.setQueryData(loadingCreateAccountQueryOptions.queryKey, {
      account: data,
    });

    try {
      const newAccount = await createAccount({ values: data });

      queryClient.setQueryData(getAllAccountsQueryOptions.queryKey, [
        newAccount,
        ...existingAccounts,
      ]);

      toast.success("Account created!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      toast.error(errorMessage);
    } finally {
      queryClient.setQueryData(loadingCreateAccountQueryOptions.queryKey, {});
      reset();
      onClose();
    }
  }

  return (
    <form
      className="flex flex-col w-full gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input
            fullWidth
            isRequired
            errorMessage={errors.name?.message}
            isDisabled={isSubmitting}
            isInvalid={!!errors.name && dirtyFields.name}
            label="Name"
            placeholder="e.g. Cash, Savings, Bank Account"
            type="text"
            {...field}
          />
        )}
      />
      <Divider className="my-2" />
      <div className="flex items-center justify-end w-full pb-4">
        <div className="flex gap-2">
          <Button color="danger" type="button" variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            isDisabled={!isValid || isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};
