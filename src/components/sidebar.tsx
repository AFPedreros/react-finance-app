"use client";

import { Button } from "@nextui-org/button";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/listbox";
import { cn } from "@nextui-org/theme";
import { Tooltip } from "@nextui-org/tooltip";
import { useCookies } from "next-client-cookies";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

import { CompactSidebarIcon, ExpandSidebarIcon } from "./icons";

import { useSidebarStore } from "@/app/stores/sidebar";
import { siteConfig } from "@/config/site";

type SidebarProps = {
  isCollapsed: boolean;
};

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useTransitionRouter();
  const cookies = useCookies();
  const setIsCollapsed = useSidebarStore((state) => state.setIsCollapsed);

  function handleToggleSidebar() {
    setIsCollapsed(!isCollapsed);
    cookies.set("isCollapsed", String(!isCollapsed));
  }

  return (
    <aside
      className={cn(
        "group fixed hidden h-[calc(100dvh-4rem)] w-72 border-r-small border-divider transition-width md:block",
        {
          "w-16": isCollapsed,
        },
      )}
    >
      <div
        className={cn("relative h-full w-full flex-col gap-y-4 p-6 md:flex", {
          "items-center px-2 py-6": isCollapsed,
        })}
      >
        <Tooltip
          showArrow
          closeDelay={0}
          content={`${isCollapsed ? "Expand" : "Collapse"} sidebar`}
          placement="right"
        >
          <Button
            isIconOnly
            className="absolute right-0 top-6 z-30 w-fit -translate-y-1/2 translate-x-1/2 transition-opacity duration-200"
            size="sm"
            variant="light"
            onPress={handleToggleSidebar}
          >
            {isCollapsed ? (
              <ExpandSidebarIcon size={18} />
            ) : (
              <CompactSidebarIcon size={18} />
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
            title={isCollapsed ? "" : "Platform"}
          >
            {siteConfig.navItems.map((item) => (
              <ListboxItem
                key={item.href}
                className={cn(
                  "group/item min-h-11 rounded-large transition-colors",
                  {
                    "bg-primary/20 text-primary data-[hover=true]:bg-primary/20 data-[hover=true]:text-primary":
                      pathname === item.href,
                  },
                )}
                startContent={isCollapsed ? null : <item.icon />}
                textValue={item.label}
                variant="flat"
              >
                {isCollapsed ? (
                  <Tooltip showArrow content={item.label} placement="right">
                    <div className="flex w-full items-center justify-center">
                      <item.icon />
                    </div>
                  </Tooltip>
                ) : (
                  <span className="transition-all duration-150 ease-in-out group-hover/item:ml-1">
                    {item.label}
                  </span>
                )}
              </ListboxItem>
            ))}
          </ListboxSection>
        </Listbox>
      </div>
    </aside>
  );
}
