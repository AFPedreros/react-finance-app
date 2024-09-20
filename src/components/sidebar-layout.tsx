"use client";

import { cn } from "@nextui-org/theme";
import { ReactNode } from "react";

import { Sidebar } from "@/components/sidebar";
import { useSidebarStore } from "@/stores/sidebar";

type AppLayoutProps = {
  children: ReactNode;
  defaultIsCollapsed: boolean;
};

export function SidebarLayout({
  children,
  defaultIsCollapsed,
}: AppLayoutProps) {
  const [isCollapsed] = useSidebarStore((state) => [state.isCollapsed]);

  return (
    <div className="flex w-full">
      <Sidebar isCollapsed={isCollapsed ?? defaultIsCollapsed} />

      <div
        className={cn(
          "w-full flex-1 pl-0 transition-all duration-300 md:pl-72",
          { "md:pl-16": isCollapsed ?? defaultIsCollapsed },
        )}
      >
        {children}
      </div>
    </div>
  );
}
