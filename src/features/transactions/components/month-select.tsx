"use client";

import { Select, SelectItem } from "@nextui-org/select";

import { months } from "../lib/utils";

export function MonthSelect() {
  const now = new Date();
  const monthIndex = now.getMonth();
  const currentMonth = months[monthIndex].key;

  return (
    <Select
      aria-labelledby="month-select"
      className="w-32"
      value={currentMonth}
      variant="bordered"
    >
      {months.map((month) => (
        <SelectItem key={month.key} value={month.key}>
          {month.label}
        </SelectItem>
      ))}
    </Select>
  );
}
