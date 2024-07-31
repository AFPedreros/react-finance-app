import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

import { loadingCreateAccountQueryOptions } from "../api/create-account";
import { getAllAccountsQueryOptions } from "../api/get-accounts";

import { DeleteAccountButton } from "./delete-account-button";
import { EditAccountModal } from "./edit-account-modal";

import { LoadingTable } from "@/components/ui/loading-table";
import { accountsColumns } from "@/lib/table-columns";
import { formatCurrency } from "@/utils/format-currency";

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
    return <LoadingTable columns={accountsColumns} name="Accounts" />;
  }

  return (
    <Table
      removeWrapper
      aria-label="Accounts table"
      color="primary"
      selectionMode="multiple"
    >
      <TableHeader columns={accountsColumns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" ? "end" : "start"}
            className="uppercase"
          >
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
                <TableCell>{account.name}</TableCell>
                <TableCell>{formatCurrency(account.balance)}</TableCell>
                <TableCell>
                  <div className="relative flex items-center justify-end gap-2">
                    <Button isIconOnly isLoading size="sm" />
                    <Button isIconOnly isLoading color="danger" size="sm" />
                  </div>
                </TableCell>
              </TableRow>
            );
          }

          return (
            <TableRow key={account.id}>
              <TableCell>{account.name}</TableCell>
              <TableCell>{formatCurrency(account.balance)}</TableCell>
              <TableCell>
                <div className="relative flex items-center justify-end gap-2">
                  <EditAccountModal
                    balance={account.balance}
                    id={account.id}
                    name={account.name}
                  />
                  <DeleteAccountButton id={account.id?.toString() ?? ""} />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
