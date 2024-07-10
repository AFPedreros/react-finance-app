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

import { LoadingExpensesTable } from "./loading-expenses-table";

import {
  getAllAccountsQueryOptions,
  loadingCreateAccountQueryOptions,
} from "@/api-client/accounts";
import { accountsColumns } from "@/lib/tableColumns";
import { formatCurrency } from "@/lib/utils";

export const AccountsTable = () => {
  const { data, isPending } = useQuery(getAllAccountsQueryOptions);
  const { data: loadingCreateAccount } = useQuery(
    loadingCreateAccountQueryOptions,
  );

  let accounts = data ?? [];

  if (loadingCreateAccount?.account) {
    const optimisticAccount = {
      ...loadingCreateAccount.account,
      id: 999999,
      createdAt: new Date().toISOString(),
    };

    accounts = [optimisticAccount, ...accounts];
  }

  if (isPending) {
    return <LoadingExpensesTable />;
  }

  return (
    <Table removeWrapper aria-label="Accounts table" color="primary">
      <TableHeader columns={accountsColumns}>
        {(column) => (
          <TableColumn key={column.key} className="uppercase">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        emptyContent={accounts.length === 0 && "No accounts found. Create one!"}
      >
        {accounts.map((account, index) => {
          if (index === 0 && loadingCreateAccount?.account) {
            return (
              <TableRow key="optimisticAccount" className="animate-pulse">
                <TableCell className="w-1/4">{account.name}</TableCell>
                <TableCell className="w-1/4">
                  {formatCurrency(account.balance)}
                </TableCell>
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
            <TableRow key={account.id}>
              <TableCell className="w-1/4">{account.name}</TableCell>
              <TableCell className="w-1/4">
                {formatCurrency(account.balance)}
              </TableCell>
              <TableCell className="w-1/4">
                <div className="relative flex items-center justify-start gap-2">
                  {/* <EditAccountModal
                    amount={account.amount}
                    date={account.date}
                    id={account.id}
                    title={account.title}
                  />
                  <AccountDeleteButton id={account.id?.toString() ?? ""} /> */}
                  hello
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
