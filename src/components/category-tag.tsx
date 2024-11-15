import { Icon } from "@iconify/react";
import { Chip } from "@nextui-org/chip";

type CategoryTagProps = {
  name: string;
  color: string;
  icon: string;
};

export function CategoryTag({ name, color, icon }: CategoryTagProps) {
  return (
    <Chip
      classNames={{
        content: "!text-small px-1",
      }}
      radius="sm"
      startContent={
        <Icon className="mr-0.5 size-4" color={color} icon={icon} />
      }
      style={{
        borderColor: `${color}50`,
      }}
      variant="faded"
    >
      {name}
    </Chip>
  );
}
