"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { useQuery } from "@tanstack/react-query";

import { getTotalSpent } from "@/api/expenses";
import { formatCurrency } from "@/lib/utils";

export const ExpensesCard = () => {
  const { data, isPending } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  return (
    <Card
      isBlurred
      className="dark:bg-default-400/10 min-w-[200px] max-w-xs border-transparent bg-white/5 backdrop-blur-lg backdrop-saturate-[1.8]"
    >
      <CardHeader>
        <p className="text-xl font-semibold">Total expend</p>
      </CardHeader>

      <CardBody className="pt-0">
        {isPending && (
          <Skeleton className="w-3/5 rounded-md">
            <div className="w-3/5 h-5 rounded-md bg-default-300" />
          </Skeleton>
        )}

        {!!data?.total && !isPending && (
          <p className="text-danger">{formatCurrency(data?.total)}</p>
        )}

        {!data?.total && !isPending && <p>No expenses saved</p>}
      </CardBody>
    </Card>
  );
};
