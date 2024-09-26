"use client";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

type IconPickerProps = {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
  isDisabled: boolean;
};

const icons = [
  "mdi:home",
  "mdi:cart",
  "mdi:car",
  "mdi:airplane",
  "mdi:food",
  "mdi:gift",
  "mdi:medical-bag",
  "mdi:school",
];

export function IconPicker({
  selectedIcon,
  onSelectIcon,
  isDisabled,
}: IconPickerProps) {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button fullWidth isDisabled={isDisabled}>
          {selectedIcon ? (
            <Icon height="24" icon={selectedIcon} width="24" />
          ) : (
            "Select Icon"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-4 gap-2 p-2">
          {icons.map((icon) => (
            <Button
              key={icon}
              isIconOnly
              className={selectedIcon === icon ? "bg-primary text-white" : ""}
              onClick={() => onSelectIcon(icon)}
            >
              <Icon height="24" icon={icon} width="24" />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
