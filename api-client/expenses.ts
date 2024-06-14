import { queryOptions } from "@tanstack/react-query";

import { api } from ".";

import { getOrCreateUUID } from "@/lib/utils";
import { CreateExpense, Expense } from "@/types";

const userId = getOrCreateUUID();

async function getAllExpenses() {
  const response = await api.expenses.$get({
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("Server error");
  }

  const expenses = await response.json();

  return expenses;
}

export async function getExpense({ id }: { id: number }) {
  const response = await api.expenses[":id{[0-9]+}"].$get({
    param: { id: id.toString() },
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("Server error");
  }

  const expense = await response.json();

  return expense;
}

export async function getTotalSpent() {
  const response = await api.expenses["total-spent"].$get({
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch total spent");
  }

  const result = await response.json();

  return result;
}

export async function createExpense({ values }: { values: CreateExpense }) {
  const response = await api.expenses.$post({
    json: { ...values },
  });

  if (!response.ok) {
    throw new Error("Error creating expense");
  }

  const newExpense = await response.json();

  return newExpense;
}

export async function updateExpense({ values }: { values: Expense }) {
  if (!values.id) throw new Error("No id provided");

  const response = await api.expenses[":id{[0-9]+}"].$patch({
    param: { id: values.id?.toString() },
    json: { ...values },
  });

  if (!response.ok) {
    throw new Error("server error");
  }

  const updatedExpense = await response.json();

  return updatedExpense;
}

export async function deleteExpense({ id }: { id: number }) {
  const response = await api.expenses[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("server error");
  }

  const deletedExpense = await response.json();

  return deletedExpense;
}

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5,
});

export const getTotalSpentQueryOptions = queryOptions({
  queryKey: ["get-total-spent"],
  queryFn: getTotalSpent,
  staleTime: 1000 * 60 * 5,
});

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpense;
}>({
  queryKey: ["loading-create-expense"],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});
