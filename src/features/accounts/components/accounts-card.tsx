"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { ChangeEvent, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import { AccountsTable } from "./accounts-table";
import { TotalBalanceChip } from "./total-balance-chip";

import { SearchInput } from "@/components/search-input";

export function AccountsCard() {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const [debouncedSearchValue] = useDebounceValue(searchValue, 500);

  return (
    <Card
      isBlurred
      className="h-full overflow-hidden border-transparent bg-white/5 backdrop-blur-lg backdrop-saturate-[1.8] dark:bg-content1"
    >
      <CardHeader className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <TotalBalanceChip />
        <SearchInput
          className="ml-auto max-w-80"
          value={searchValue}
          onChange={handleChange}
        />
      </CardHeader>

      <Divider />

      <CardBody className="overflow-auto">
        <AccountsTable searchValue={debouncedSearchValue} />
      </CardBody>
    </Card>
  );
}
