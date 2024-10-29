import { Icon } from "@iconify/react";
import { Chip } from "@nextui-org/chip";

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
        base: type === "expense" ? "text-danger" : "text-success",
      }}
      radius="sm"
      startContent={<Icon className="size-4" icon={icon} />}
      style={{
        borderColor: `${color}50`,
      }}
      variant="faded"
    >
      {name}
    </Chip>
  );
}
