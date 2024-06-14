"use client";

import { Button } from "@nextui-org/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";

import { EditExpenseModal } from "./edit-expense-modal";
import { ExpenseDeleteButton } from "./expense-delete-button";
import { LoadingExpensesTable } from "./loading-expenses-table";

import {
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
} from "@/api-client/expenses";
import { expensesColumns } from "@/lib/tableColumns";
import { formatCurrency } from "@/lib/utils";

export const ExpensesTable = () => {
  const { data, isPending } = useQuery(getAllExpensesQueryOptions);
  const { data: loadingCreateExpense } = useQuery(
    loadingCreateExpenseQueryOptions,
  );

  let expenses = data ?? [];

  if (loadingCreateExpense?.expense) {
    const optimisticExpense = {
      ...loadingCreateExpense.expense,
      id: 999999,
      createdAt: new Date().toISOString(),
    };

    expenses = [optimisticExpense, ...expenses];
  }

  if (isPending) {
    return <LoadingExpensesTable />;
  }

  return (
    <Table aria-label="Expenses table" color="primary">
      <TableHeader columns={expensesColumns}>
        {(column) => (
          <TableColumn key={column.key} className="uppercase">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        emptyContent={expenses.length === 0 && "No expenses found. Create one!"}
      >
        {expenses.map((expense, index) => {
          if (index === 0 && loadingCreateExpense?.expense) {
            return (
              <TableRow key="optimisticExpense" className="animate-pulse">
                <TableCell className="w-1/4">{expense.title}</TableCell>
                <TableCell className="w-1/4">
                  {formatCurrency(expense.amount)}
                </TableCell>
                <TableCell className="w-1/4">{expense.date}</TableCell>
                <TableCell className="w-1/4">
                  <div className="relative flex items-center justify-start gap-2">
                    <Button isIconOnly isLoading size="sm" />
                    <Button isIconOnly isLoading color="danger" size="sm" />
                  </div>
                </TableCell>
              </TableRow>
            );
          }

          return (
            <TableRow key={expense.id}>
              <TableCell className="w-1/4">{expense.title}</TableCell>
              <TableCell className="w-1/4">
                {formatCurrency(expense.amount)}
              </TableCell>
              <TableCell className="w-1/4">{expense.date}</TableCell>
              <TableCell className="w-1/4">
                <div className="relative flex items-center justify-start gap-2">
                  <EditExpenseModal
                    amount={expense.amount}
                    date={expense.date}
                    id={expense.id}
                    title={expense.title}
                  />
                  <ExpenseDeleteButton id={expense.id?.toString() ?? ""} />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
