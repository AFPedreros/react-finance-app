"use client";

import { Select, SelectItem } from "@nextui-org/select";

import { months } from "../lib/utils";

export function MonthSelect() {
  return (
    <Select className="max-w-xs" label="Select a month">
      {months.map((month) => (
        <SelectItem key={month.key}>{month.label}</SelectItem>
      ))}
    </Select>
  );
}
