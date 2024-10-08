import { Input } from "@nextui-org/input";
import { cn } from "@nextui-org/theme";
import { ChangeEvent, HTMLAttributes } from "react";

import { SearchIcon } from "./icons";

type SearchInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & HTMLAttributes<HTMLDivElement>;

export function SearchInput({ className, value, onChange }: SearchInputProps) {
  return (
    <Input
      aria-label="Search"
      classNames={{
        base: "px-1",
        inputWrapper: cn(
          className,
          "bg-default-400/20 data-[hover=true]:bg-default-500/30 group-data-[focus=true]:bg-default-500/20",
        ),
        input:
          "placeholder:text-default-600 group-data-[has-value=true]:text-foreground",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="flex-shrink-0 text-default-600 [&>g]:stroke-[2px]" />
      }
      type="search"
      value={value}
      onChange={onChange}
    />
  );
}
