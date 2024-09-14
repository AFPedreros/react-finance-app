import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateAccount } from "../api/create-account";
import { createAccountFormSchema } from "../schemas";
import { CreateAccountInputs } from "../types";

import { getOrCreateUUID } from "@/lib/utils";

type CreateAccountFormProps = {
  onClose: () => void;
};

export function CreateAccountForm({ onClose }: CreateAccountFormProps) {
  const userId = getOrCreateUUID();

  const { mutate } = useCreateAccount({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Account created!");
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
  } = useForm<CreateAccountInputs>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      name: "",
      balance: "",
    },
    mode: "onChange",
  });

  function onSubmit(values: CreateAccountInputs) {
    const data = {
      ...values,
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
}
