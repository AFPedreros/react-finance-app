import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";

import { SearchIcon } from "@/components/icons";

export const SearchInput = () => {
  return (
    <Input
      aria-label="Search"
      classNames={{
        base: "px-1",
        inputWrapper:
          "bg-primary-400 dark:bg-primary-300 data-[hover=true]:bg-primary-300/80 group-data-[focus=true]:bg-primary-300",
        input:
          "font-light placeholder:text-primary-foreground/80 group-data-[has-value=true]:text-primary-foreground",
      }}
      endContent={
        <Kbd
          className="hidden lg:inline-block bg-primary-foreground text-foreground-600 dark:text-[hsl(240,5.2%,33.92%)]"
          keys={["command"]}
        >
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="flex-shrink-0 text-base pointer-events-none text-primary-foreground/75" />
      }
      type="search"
    />
  );
};
