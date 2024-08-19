import { Chip, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

import { getTotalBalanceAccountsQueryOptions } from "../api/get-total-balance-accounts";

import { formatCurrency } from "@/utils/format-currency";

export const TotalBalanceChip = () => {
  const { data, isPending } = useQuery(getTotalBalanceAccountsQueryOptions);

  if (isPending) {
    return <Skeleton className="mr-2 h-6 w-40 rounded-full bg-transparent" />;
  }

  return (
    <Chip className="mr-2" color="success" variant="faded">
      Total: {formatCurrency(data?.totalBalance ?? "0")}
    </Chip>
  );
};
