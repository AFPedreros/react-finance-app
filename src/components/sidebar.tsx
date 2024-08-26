"use client";

import { Button } from "@nextui-org/button";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/listbox";
import { cn } from "@nextui-org/theme";
import { Tooltip } from "@nextui-org/tooltip";
import { useCookies } from "next-client-cookies";
import { usePathname, useRouter } from "next/navigation";

import { CompactSidebarIcon, ExpandSidebarIcon } from "./icons";

import { useSidebarStore } from "@/app/stores/sidebar";
import { siteConfig } from "@/config/site";

type SidebarProps = {
  isCollapsed: boolean;
};

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const cookies = useCookies();
  const setIsCollapsed = useSidebarStore((state) => state.setIsCollapsed);

  function handleToggleSidebar() {
    setIsCollapsed(!isCollapsed);
    cookies.set("isCollapsed", String(!isCollapsed));
  }

  return (
    <aside
      className={cn(
        "fixed hidden h-[calc(100dvh-4rem)] w-72 flex-col gap-y-4 border-r-small border-divider p-6 transition-width md:flex",
        {
          "w-16 items-center px-2 py-6": isCollapsed,
        },
      )}
    >
      <Tooltip
        showArrow
        content={`${isCollapsed ? "Expand" : "Collapse"} sidebar`}
        placement="right"
      >
        <Button
          isIconOnly
          className="hidden w-fit md:flex"
          size="sm"
          variant="ghost"
          onPress={handleToggleSidebar}
        >
          {isCollapsed ? (
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
          title={isCollapsed ? "" : "Platform"}
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
              startContent={isCollapsed ? null : <item.icon />}
              textValue={item.label}
              title={isCollapsed ? null : item.label}
              variant="flat"
            >
              {isCollapsed ? (
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
