"use client";

import { Chip } from "@nextui-org/chip";
import { Skeleton } from "@nextui-org/skeleton";

import { useTotalBalanceAccounts } from "../api/get-total-balance-accounts";

import { AnimatedNumber } from "@/components/animated-number";

export function TotalBalanceChip() {
  const { data, isPending } = useTotalBalanceAccounts();

  if (isPending) {
    return <Skeleton className="mr-2 h-6 w-40 rounded-full bg-transparent" />;
  }

  return (
    <Chip className="mr-2" color="success" variant="faded">
      Total:{" "}
      <AnimatedNumber
        springOptions={{
          bounce: 0,
          duration: 1000,
        }}
        value={Number(data?.totalBalance) ?? 0}
      />
    </Chip>
  );
}
