import { Icon } from "@iconify/react";
import { Chip } from "@nextui-org/chip";
import { cn } from "@nextui-org/theme";

type CategoryTagProps = {
  name: string;
  color: string;
  icon: string;
  type?: "expense" | "income";
};

export function CategoryTag({
  name,
  color,
  icon,
  type = "expense",
}: CategoryTagProps) {
  return (
    <Chip
      classNames={{
        content: "!text-small px-1",
      }}
      radius="sm"
      startContent={<Icon className="size-4" icon={icon} />}
      endContent={
        <span
          className={cn(
            "size-1.5 rounded-full",
            type === "expense" ? "bg-danger" : "bg-success",
          )}
        />
      }
      // color={type === "expense" ? "danger" : "success"}
      style={{
        backgroundColor: `${color}15`,
        color: color,
        border: `2px solid ${color}30`,
      }}
      variant="flat"
    >
      {name}
    </Chip>
  );
}
