"use client";

import { Select, SelectItem } from "@nextui-org/select";

import { typesOfTransaction } from "../lib/utils";

export function CreateTransactionSelect() {
  return (
    <Select
      aria-labelledby="transaction-select"
      className="w-full"
      label="Type of transaction"
    >
      {typesOfTransaction.map((transaction) => (
        <SelectItem key={transaction.key} value={transaction.key}>
          {transaction.label}
        </SelectItem>
      ))}
    </Select>
  );
}
