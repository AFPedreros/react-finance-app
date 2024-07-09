import { queryOptions } from "@tanstack/react-query";

import { api } from ".";

import { getOrCreateUUID } from "@/lib/utils";
import { Account, CreateAccount } from "@/types";

const userId = getOrCreateUUID();

async function getAllAccounts() {
  const response = await api.accounts.$get({
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("Server error");
  }

  const accounts = await response.json();

  return accounts;
}

export async function getAccount({ id }: { id: number }) {
  const response = await api.accounts[":id{[0-9]+}"].$get({
    param: { id: id.toString() },
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("Server error");
  }

  const accounts = await response.json();

  return accounts;
}

export async function createAccount({ values }: { values: CreateAccount }) {
  const response = await api.accounts.$post({
    json: { ...values },
  });

  if (!response.ok) {
    throw new Error("Error creating account");
  }

  const newAccount = await response.json();

  return newAccount;
}

export async function updateAccount({ values }: { values: Account }) {
  if (!values.id) throw new Error("No id provided");

  const response = await api.accounts[":id{[0-9]+}"].$patch({
    param: { id: values.id?.toString() },
    json: { ...values },
  });

  if (!response.ok) {
    throw new Error("server error");
  }

  const updatedAccount = await response.json();

  return updatedAccount;
}

export async function deleteAccount({ id }: { id: number }) {
  const response = await api.accounts[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
    query: { userId },
  });

  if (!response.ok) {
    throw new Error("server error");
  }

  const deletedAccount = await response.json();

  return deletedAccount;
}

export const getAllAccountsQueryOptions = queryOptions({
  queryKey: ["get-all-accounts"],
  queryFn: getAllAccounts,
  staleTime: 1000 * 60 * 5,
});

export const loadingCreateAccountQueryOptions = queryOptions<{
  account?: CreateAccount;
}>({
  queryKey: ["loading-create-account"],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});
