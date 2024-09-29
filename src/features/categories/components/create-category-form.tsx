import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateCategory } from "../api/create-category";
import { createCategoryFormSchema } from "../schemas";
import { CreateCategoryInputs } from "../types";

import { ColorPicker } from "./color-picker";
import { IconPicker } from "./icon-picker";

import { getOrCreateUUID } from "@/lib/utils";

type CreateCategoryFormProps = {
  onClose: () => void;
};

export function CreateCategoryForm({ onClose }: CreateCategoryFormProps) {
  const userId = getOrCreateUUID();

  const { mutate } = useCreateCategory({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Category created!");
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
  } = useForm<CreateCategoryInputs>({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      name: "",
      color: "#000000",
      icon: "",
      type: "expense",
    },
    mode: "onChange",
  });

  function onSubmit(values: CreateCategoryInputs) {
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
          <div className="flex flex-col">
            <span className="pointer-events-none z-10 block max-w-full cursor-pointer overflow-hidden text-ellipsis pe-2 text-small text-foreground-500 subpixel-antialiased transition-[transform,color,left,opacity] !duration-200 !ease-out will-change-auto after:ml-0.5 after:text-danger after:content-['*'] group-data-[filled=true]:pointer-events-auto group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px)] group-data-[filled=true]:scale-85 group-data-[filled=true]:text-default-600 motion-reduce:transition-none">
              Icon
            </span>
            <IconPicker
              isDisabled={isSubmitting}
              selectedIcon={field.value}
              onSelectIcon={field.onChange}
            />
          </div>
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
