"use client";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

type IconPickerProps = {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
};

const icons = [
  "solar:football-outline",
  "solar:home-outline",
  "solar:cup-hot-outline",
  "solar:wineglass-triangle-outline",
  "solar:heart-pulse-outline",
  "solar:leaf-outline",
  "solar:bill-list-outline",
  "solar:book-bookmark-outline",
  "solar:case-outline",
  "solar:square-academic-cap-outline",
  "solar:cart-large-minimalistic-outline",
  "solar:shop-outline",
  "solar:scooter-outline",
  "solar:gas-station-outline",
  "solar:gift-outline",
];

export function IconPicker({ selectedIcon, onSelectIcon }: IconPickerProps) {
  return (
    <div className="flex flex-col rounded-medium bg-default-100 px-3 py-2 shadow-sm">
      <span className="pointer-events-none z-10 block max-w-full cursor-pointer overflow-hidden text-ellipsis pe-2 text-small text-foreground-500 subpixel-antialiased transition-[transform,color,left,opacity] !duration-200 !ease-out will-change-auto after:ml-0.5 after:text-danger after:content-['*'] group-data-[filled=true]:pointer-events-auto group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px)] group-data-[filled=true]:scale-85 group-data-[filled=true]:text-default-600 motion-reduce:transition-none">
        Icon
      </span>
      <ScrollShadow className="h-32">
        <div className="flex w-full flex-wrap">
          {icons.map((icon) => (
            <Button
              key={icon}
              isIconOnly
              color={selectedIcon === icon ? "primary" : "default"}
              variant={selectedIcon === icon ? "flat" : "light"}
              onClick={() => onSelectIcon(icon)}
            >
              <Icon className="size-5" icon={icon} />
            </Button>
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
}
