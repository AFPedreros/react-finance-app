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
  loadingCreateAccountQueryOptions,
} from "../api/create-account";
import { getAllAccountsQueryOptions } from "../api/get-accounts";
import { getTotalBalanceAccountsQueryOptions } from "../api/get-total-balance-accounts";

import { createAccountSchema } from "@/db/schemas";
import { getOrCreateUUID } from "@/lib/utils";

const formSchema = createAccountSchema.omit({ userId: true });

type Inputs = z.infer<typeof formSchema>;

export const CreateAccountForm = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  const userId = getOrCreateUUID();

  const {
    formState: { isValid, isSubmitting, dirtyFields, errors },
    control,
    handleSubmit,
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      balance: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: Inputs) {
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

      const totalBalance =
        parseFloat(newAccount.balance) +
        existingAccounts.reduce(
          (acc, account) => acc + parseFloat(account.balance),
          0,
        );

      queryClient.setQueryData(getTotalBalanceAccountsQueryOptions().queryKey, {
        totalBalance: totalBalance.toString(),
      });

      reset();
      onClose();
      toast.success("Account created!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      toast.error(errorMessage);
    } finally {
      queryClient.setQueryData(loadingCreateAccountQueryOptions.queryKey, {});
    }
  }

  return (
    <form
      className="flex w-full flex-col gap-4"
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
            label="Initial balance"
            startContent={<p className="text-default-400">$</p>}
            type="number"
            {...field}
          />
        )}
      />
      <Divider className="my-2" />
      <Button
        fullWidth
        color="primary"
        isDisabled={!isValid || isSubmitting}
        isLoading={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Creating" : "Create"}
      </Button>
    </form>
  );
};
