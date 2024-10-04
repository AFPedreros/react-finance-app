"use client";

import { Spinner } from "@nextui-org/spinner";
import {
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { cn } from "@nextui-org/theme";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { loadingCreateCategoryQueryOptions } from "../api/create-category";
import { useAllCategories } from "../api/get-categories";
import { columns } from "../lib/columns";

export function CategoriesTable({ searchValue }: { searchValue: string }) {
  const { data, isPending } = useAllCategories();
  const { data: loadingCreateAccount } = useQuery(
    loadingCreateCategoryQueryOptions(),
  );

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  let categories = data ?? [];

  if (loadingCreateAccount?.category) {
    const optimisticAccount = {
      ...loadingCreateAccount.category,
      id: 999999,
      createdAt: new Date().toISOString(),
    };

    categories = [optimisticAccount, ...categories];
  }

  const searchedCategories = useMemo(() => {
    return categories.filter((account) =>
      account.name.toLowerCase().includes(searchValue?.toLowerCase()),
    );
  }, [categories, searchValue]);

  const sortedCategories = useMemo(() => {
    return [...searchedCategories].sort((a, b) => {
      const column = sortDescriptor.column as keyof (typeof categories)[0];
      let first = a[column];
      let second = b[column];

      if (typeof first === "string" && typeof second === "string") {
        return sortDescriptor.direction === "ascending"
          ? first.localeCompare(second)
          : second.localeCompare(first);
      }

      if (typeof first === "number" && typeof second === "number") {
        return sortDescriptor.direction === "ascending"
          ? first - second
          : second - first;
      }

      return 0;
    });
  }, [searchedCategories, sortDescriptor]);

  return (
    <Table
      removeWrapper
      aria-label="Categories table"
      classNames={{
        base: "flex-1",
        table: cn({ "min-h-full": categories.length === 0 }),
      }}
      color="primary"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={columns}>
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
        emptyContent={
          categories.length === 0 && "No categories found. Create one!"
        }
        isLoading={isPending}
        items={sortedCategories}
        loadingContent={<Spinner size="lg" />}
      >
        {sortedCategories.map((account) => {
          const isOptimisticCategory = account.id === 999999;

          return (
            <TableRow key={account.id}>
              <TableCell>{account.name}</TableCell>
              <TableCell>Label</TableCell>
              <TableCell>
                <div className="relative flex items-center justify-end gap-2">
                  Actions
                  {/* <UpdateAccountModal
                    balance={account.balance}
                    id={account.id}
                    isLoading={isOptimisticAccount}
                    name={account.name}
                  />
                  <DeleteAccountButton
                    id={account.id?.toString() ?? ""}
                    isLoading={isOptimisticAccount}
                  /> */}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}