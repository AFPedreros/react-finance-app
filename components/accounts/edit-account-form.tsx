"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { EditAccountModalProps } from "./edit-account-modal";

import {
  getAllAccountsQueryOptions,
  updateAccount,
} from "@/api-client/accounts";
import { getOrCreateUUID } from "@/lib/utils";
import { createAccountSchema } from "@/types";

const formSchema = createAccountSchema.omit({ userId: true });

type EditAccountFormProps = {
  account: EditAccountModalProps;
  onClose: () => void;
};

export const EditAccountForm = ({ account, onClose }: EditAccountFormProps) => {
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
      balance: account.balance.split(".")[0],
      name: account.name,
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const existingAccounts = await queryClient.ensureQueryData(
      getAllAccountsQueryOptions,
    );

    const data = {
      ...values,
      id: account.id,
      userId,
    };

    try {
      const updatedAccount = await updateAccount({ values: data });

      const newAccounts = existingAccounts.map((item) =>
        item.id === updatedAccount.id ? updatedAccount : item,
      );

      queryClient.setQueryData(
        getAllAccountsQueryOptions.queryKey,
        newAccounts,
      );

      toast.success("Account updated!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      toast.error(errorMessage);
    } finally {
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
            placeholder="Cat food"
            type="text"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="balance"
        render={({ field }) => (
          <Input
            fullWidth
            isRequired
            errorMessage={errors.balance?.message}
            isDisabled={isSubmitting}
            isInvalid={!!errors.balance && dirtyFields.balance}
            label="Balance"
            startContent={<p className="text-default-400">$</p>}
            type="number"
            {...field}
          />
        )}
      />
      <Divider className="my-2" />
      <div className="flex items-center justify-end w-full pb-4">
        <div className="flex gap-2">
          <Button
            color="danger"
            isDisabled={!isValid || isSubmitting}
            isLoading={isSubmitting}
            type="button"
            variant="flat"
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            isDisabled={!isValid || isSubmitting}
            isLoading={isSubmitting}
            type="submit"
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};
