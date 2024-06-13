"use client";

import { Button } from "@nextui-org/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { TrashIcon } from "./icons";

import { deleteExpense, getAllExpensesQueryOptions } from "@/api/expenses";

export const ExpenseDeleteButton = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast.error("Error deleting expense");
    },
    onSuccess: () => {
      toast.success("Expense deleted!");

      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        (existingExpenses) => ({
          ...existingExpenses,
          expenses: existingExpenses!.expenses.filter(
            (e) => e.id !== Number(id),
          ),
        }),
      );
    },
  });

  return (
    <Button
      isIconOnly
      color="danger"
      disabled={mutation.isPending}
      isLoading={mutation.isPending}
      size="sm"
      startContent={!mutation.isPending && <TrashIcon size={18} />}
      variant="flat"
      onClick={() => mutation.mutate({ id: Number(id) })}
    />
  );
};
