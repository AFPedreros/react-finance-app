import {
  SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { loadingCreateAccountQueryOptions } from "../api/create-account";
import { getAllAccountsQueryOptions } from "../api/get-accounts";

import { DeleteAccountButton } from "./delete-account-button";
import { EditAccountModal } from "./edit-account-modal";

import { accountsColumns } from "@/lib/table-columns";
import { formatCurrency } from "@/utils/format-currency";

export const AccountsTable = () => {
  const { data, isPending } = useQuery(getAllAccountsQueryOptions);
  const { data: loadingCreateAccount } = useQuery(
    loadingCreateAccountQueryOptions,
  );

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  let accounts = data ?? [];

  if (loadingCreateAccount?.account) {
    const optimisticAccount = {
      ...loadingCreateAccount.account,
      id: 999999,
      createdAt: new Date().toISOString(),
    };

    accounts = [optimisticAccount, ...accounts];
  }

  const sortedAccounts = useMemo(() => {
    return [...accounts].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof (typeof accounts)[0]];
      const second = b[sortDescriptor.column as keyof (typeof accounts)[0]];

      if (typeof first === "string" && typeof second === "string") {
        return sortDescriptor.direction === "ascending"
          ? first.localeCompare(second)
          : second.localeCompare(first);
      }

      return sortDescriptor.direction === "ascending"
        ? (first as number) - (second as number)
        : (second as number) - (first as number);
    });
  }, [accounts, sortDescriptor]);

  return (
    <Table
      removeWrapper
      aria-label="Accounts table"
      color="primary"
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={accountsColumns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" ? "end" : "start"}
            allowsSorting={column.sortable}
            className="uppercase"
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        emptyContent={accounts.length === 0 && "No accounts found. Create one!"}
        isLoading={isPending}
        items={sortedAccounts}
        loadingContent={<Spinner label="Loading..." />}
      >
        {sortedAccounts.map((account) => {
          const isOptimisticAccount = account.id === 999999;

          return (
            <TableRow key={account.id}>
              <TableCell>{account.name}</TableCell>
              <TableCell>{formatCurrency(account.balance)}</TableCell>
              <TableCell>
                <div className="relative flex items-center justify-end gap-2">
                  <EditAccountModal
                    balance={account.balance}
                    id={account.id}
                    isLoading={isOptimisticAccount}
                    name={account.name}
                  />
                  <DeleteAccountButton
                    id={account.id?.toString() ?? ""}
                    isLoading={isOptimisticAccount}
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
