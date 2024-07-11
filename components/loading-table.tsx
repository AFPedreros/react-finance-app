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

import { Column } from "@/types";

type LoadingTableProps = {
  columns: Column[];
  name: string;
};

export const LoadingTable = ({ columns, name }: LoadingTableProps) => {
  return (
    <Table removeWrapper aria-label={`${name} table`} color="primary">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} className="uppercase">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <TableRow key={index}>
              {columns.map((column, index) =>
                index !== columns.length - 1 ? (
                  <TableCell key={column.label} className="w-1/4">
                    <Skeleton className="w-32 rounded-md">
                      <div className="h-4 rounded-md bg-default-300" />
                    </Skeleton>
                  </TableCell>
                ) : (
                  <TableCell key={column.label} className="w-1/4 ">
                    <div className="relative flex items-center justify-start gap-2">
                      <Button isIconOnly isLoading size="sm" />
                      <Button isIconOnly isLoading color="danger" size="sm" />
                    </div>
                  </TableCell>
                ),
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
