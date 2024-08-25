"use client";

import { Button } from "@nextui-org/button";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/listbox";
import { cn } from "@nextui-org/theme";
import { Tooltip } from "@nextui-org/tooltip";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import { CompactSidebarIcon, ExpandSidebarIcon } from "./icons";

import { siteConfig } from "@/config/site";

type SidebarProps = {
  isCompact: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
};

export function Sidebar({ isCompact, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside
      className={cn(
        "fixed flex h-[calc(100dvh-4rem)] w-72 flex-col gap-y-4 border-r-small border-divider p-6 transition-width",
        {
          "w-16 items-center px-2 py-6": isCompact,
        },
      )}
    >
      <Tooltip
        showArrow
        content={`${isCompact ? "Expand" : "Compact"} sidebar`}
        placement="right"
      >
        <Button
          isIconOnly
          className="w-fit"
          size="sm"
          variant="ghost"
          onPress={() => setIsCollapsed((prev) => !prev)}
        >
          {isCompact ? (
            <ExpandSidebarIcon size={20} />
          ) : (
            <CompactSidebarIcon size={20} />
          )}
        </Button>
      </Tooltip>

      <Listbox
        aria-label="Main navigation"
        classNames={{ base: "p-0", list: "gap-1" }}
        onAction={(key) => router.push(key.toString())}
      >
        <ListboxSection
          classNames={{ group: "space-y-2" }}
          title={isCompact ? "" : "Platform"}
        >
          {siteConfig.navItems.map((item) => (
            <ListboxItem
              key={item.href}
              className={cn(
                "min-h-11 rounded-large transition-colors duration-300",
                {
                  "bg-primary/20 text-primary data-[hover=true]:bg-primary/20 data-[hover=true]:text-primary":
                    pathname === item.href,
                },
              )}
              startContent={isCompact ? null : <item.icon />}
              textValue={item.label}
              title={isCompact ? null : item.label}
              variant="flat"
            >
              {isCompact ? (
                <Tooltip showArrow content={item.label} placement="right">
                  <div className="flex w-full items-center justify-center">
                    <item.icon />
                  </div>
                </Tooltip>
              ) : null}
            </ListboxItem>
          ))}
        </ListboxSection>
      </Listbox>
    </aside>
  );
}
