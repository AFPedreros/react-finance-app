import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

import { expensesColumns } from "@/lib/tableColumns";

export const LoadingExpensesTable = () => {
  return (
    <Table aria-label="Expenses table" color="primary">
      <TableHeader columns={expensesColumns}>
        {(column) => (
          <TableColumn key={column.key} className="uppercase">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <TableRow key={index}>
              <TableCell className="w-1/4">
                <Skeleton className="rounded-md">
                  <div className="h-4 rounded-md bg-default-300" />
                </Skeleton>
              </TableCell>
              <TableCell className="w-1/4">
                <Skeleton className="rounded-md">
                  <div className="h-4 rounded-md bg-default-300" />
                </Skeleton>
              </TableCell>
              <TableCell className="w-1/4">
                <Skeleton className="rounded-md">
                  <div className="h-4 rounded-md bg-default-300" />
                </Skeleton>
              </TableCell>
              <TableCell className="w-1/4 ">
                <div className="relative flex items-center justify-start gap-2">
                  <Button isIconOnly isLoading size="sm" />
                  <Button isIconOnly isLoading color="danger" size="sm" />
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
