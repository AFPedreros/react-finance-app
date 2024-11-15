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
import { useDeleteCategory } from "../api/delete-category";
import { useAllCategories } from "../api/get-categories";
import { columns } from "../lib/columns";

import { UpdateCategoryForm } from "./update-category-form";

import { CategoryTag } from "@/components/category-tag";
import { DeleteButton } from "@/components/delete-button";
import { EditModal } from "@/components/edit-modal";

export function CategoriesTable({ searchValue }: { searchValue: string }) {
  const { data, isPending } = useAllCategories();
  const { data: loadingCreateCategory } = useQuery(
    loadingCreateCategoryQueryOptions(),
  );
  const { mutate } = useDeleteCategory({});

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  let categories = data ?? [];

  if (loadingCreateCategory?.category) {
    const optimisticCategory = {
      ...loadingCreateCategory.category,
      id: 999999,
      createdAt: new Date(),
    };

    categories = [optimisticCategory, ...categories];
  }

  const searchedCategories = useMemo(() => {
    return categories.filter((categories) =>
      categories.name.toLowerCase().includes(searchValue?.toLowerCase()),
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
        {sortedCategories.map((category) => {
          const isOptimisticCategory = category.id === 999999;

          return (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <CategoryTag
                  color={category.color}
                  icon={category.icon}
                  name={category.name}
                />
              </TableCell>
              <TableCell>
                <div className="relative flex items-center justify-end gap-2">
                  <EditModal
                    description="Add the details of the category you want to edit."
                    isLoading={isOptimisticCategory}
                    title="Edit category"
                  >
                    <UpdateCategoryForm
                      category={{
                        color: category.color,
                        icon: category.icon,
                        id: category.id,
                        name: category.name,
                        type: category.type,
                      }}
                    />
                  </EditModal>

                  <DeleteButton<string>
                    errorMessage="Error deleting category"
                    id={category.id!.toString()}
                    isLoading={isOptimisticCategory}
                    successMessage="Category deleted!"
                    onDelete={async (id) => {
                      await mutate({ id: Number(id) });
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
