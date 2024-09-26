import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateAccount } from "../api/update-account";
import { updateAccountFormSchema } from "../schemas";
import { UpdateAccountInputs } from "../types";

import { getOrCreateUUID } from "@/lib/utils";
import { Account } from "@/types";

type UpdateAccountFormProps = {
  account: Omit<Account, "createdAt" | "userId">;
  onClose: () => void;
};

export function UpdateAccountForm({
  account,
  onClose,
}: UpdateAccountFormProps) {
  const userId = getOrCreateUUID();

  const { mutate } = useUpdateAccount({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Account updated!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  });

  const {
    formState: { isValid, isSubmitting, dirtyFields, errors },
    control,
    handleSubmit,
    reset,
  } = useForm<UpdateAccountInputs>({
    resolver: zodResolver(updateAccountFormSchema),
    defaultValues: {
      balance: account.balance.split(".")[0],
      name: account.name,
    },
    mode: "onChange",
  });

  function onSubmit(values: UpdateAccountInputs) {
    const data = {
      ...values,
      id: account.id,
      userId,
    };

    mutate({ data });
    reset();
    onClose();
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
            label="New balance"
            startContent={<p className="text-default-400">$</p>}
            type="number"
            {...field}
          />
        )}
      />
      <Divider className="my-2" />
      <div className="flex w-full items-center justify-end pb-4">
        <div className="flex gap-2">
          <Button
            color="danger"
            isDisabled={!isValid || isSubmitting}
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
}
