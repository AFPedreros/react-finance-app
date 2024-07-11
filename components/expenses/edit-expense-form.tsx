"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { parseDate } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { DatePicker } from "@nextui-org/date-picker";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { EditExpenseModalProps } from "./edit-expense-modal";

import {
  getAllExpensesQueryOptions,
  getTotalSpentQueryOptions,
  updateExpense,
} from "@/api-client/expenses";
import { getOrCreateUUID } from "@/lib/utils";
import { createExpenseSchema } from "@/types";

const formSchema = createExpenseSchema.omit({ userId: true });

type EditExpenseFormProps = {
  expense: EditExpenseModalProps;
  onClose: () => void;
};

export const EditExpenseForm = ({ expense, onClose }: EditExpenseFormProps) => {
  const queryClient = useQueryClient();
  const userId = getOrCreateUUID();

  const {
    formState: { isValid, isSubmitting, dirtyFields, errors },
    control,
    setValue,
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: expense.title,
      amount: expense.amount.split(".")[0],
      date: expense.date,
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const existingExpenses = await queryClient.ensureQueryData(
      getAllExpensesQueryOptions,
    );

    const data = {
      ...values,
      id: expense.id,
      userId,
    };

    try {
      const updatedExpense = await updateExpense({ values: data });

      const newExpenses = existingExpenses.map((item) =>
        item.id === updatedExpense.id ? updatedExpense : item,
      );

      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        newExpenses,
      );
      queryClient.setQueryData(
        getTotalSpentQueryOptions.queryKey,
        (oldTotal) => {
          const oldExpense = existingExpenses.find(
            (item) => item.id === updatedExpense.id,
          );
          const oldAmount = oldExpense ? Number(oldExpense.amount) : 0;
          const newAmount = Number(updatedExpense.amount);
          const newTotal = Number(oldTotal?.total) - oldAmount + newAmount;

          return { total: newTotal.toString() };
        },
      );

      toast.success("Expense updated!");
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
        name="title"
        render={({ field }) => (
          <Input
            fullWidth
            isRequired
            errorMessage={errors.title?.message}
            isDisabled={isSubmitting}
            isInvalid={!!errors.title && dirtyFields.title}
            label="Title"
            placeholder="Cat food"
            type="text"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="amount"
        render={({ field }) => (
          <Input
            fullWidth
            isRequired
            errorMessage={errors.amount?.message}
            isDisabled={isSubmitting}
            isInvalid={!!errors.amount && dirtyFields.amount}
            label="Amount"
            startContent={<p className="text-default-400">$</p>}
            type="number"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="date"
        render={() => (
          <DatePicker
            isRequired
            defaultValue={parseDate(expense.date)}
            errorMessage={errors.date?.message}
            isDisabled={isSubmitting}
            isInvalid={!!errors.date && dirtyFields.date}
            label="Date"
            onChange={(date) => setValue("date", date.toString())}
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
