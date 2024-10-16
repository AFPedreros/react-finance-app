import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateCategory } from "../api/update-category";
// import { useUpdateAccount } from "../api/update-account";
import { updateCategoryFormSchema } from "../schemas";
import { UpdateCategoryInputs } from "../types";

import { ColorPicker } from "./color-picker";
import { IconPicker } from "./icon-picker";

import { getOrCreateUUID } from "@/lib/utils";
import { Category } from "@/types";

type UpdateCategoryFormProps = {
  category: Omit<Category, "createdAt" | "userId">;
  onClose?: () => void;
};

export function UpdateCategoryForm({
  category,
  onClose,
}: UpdateCategoryFormProps) {
  const userId = getOrCreateUUID();

  const { mutate } = useUpdateCategory({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Category updated!");
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
  } = useForm<UpdateCategoryInputs>({
    resolver: zodResolver(updateCategoryFormSchema),
    defaultValues: {
      name: category.name,
      color: category.color,
      icon: category.icon,
      type: category.type,
    },
    mode: "onChange",
  });

  function onSubmit(values: UpdateCategoryInputs) {
    const data = {
      ...values,
      id: category.id,
      userId,
    };

    mutate({ data });
    // console.log(data);
    reset();
    onClose?.();
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
            placeholder="e.g. Groceries, Rent, Salary"
            type="text"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <Select
            fullWidth
            isRequired
            defaultSelectedKeys={[category.type]}
            errorMessage={errors.type?.message}
            isDisabled={isSubmitting}
            isInvalid={!!errors.type && dirtyFields.type}
            label="Type"
            placeholder="Select category type"
            {...field}
          >
            <SelectItem key="expense" value="expense">
              Expense
            </SelectItem>
            <SelectItem key="income" value="income">
              Income
            </SelectItem>
          </Select>
        )}
      />
      <Controller
        control={control}
        name="color"
        render={({ field }) => (
          <ColorPicker
            isDisabled={isSubmitting}
            selectedColor={field.value}
            onSelectColor={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="icon"
        render={({ field }) => (
          <IconPicker
            selectedIcon={field.value}
            onSelectIcon={field.onChange}
          />
        )}
      />

      <Divider className="my-2" />

      <div className="ml-auto flex gap-2 pb-4">
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
    </form>
  );
}
