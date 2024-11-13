"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";

import { months } from "../lib/utils";

type MonthSelectProps = {
  currentMonth: string;
};

export function MonthSelect({ currentMonth }: MonthSelectProps) {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  return (
    <Select
      aria-labelledby="month-select"
      className="w-32"
      selectedKeys={[selectedMonth]}
      variant="bordered"
      onChange={(e) =>
        setSelectedMonth(e.target.value === "" ? selectedMonth : e.target.value)
      }
    >
      {months.map((month) => (
        <SelectItem key={month.key} value={month.key}>
          {month.label}
        </SelectItem>
      ))}
    </Select>
  );
}
