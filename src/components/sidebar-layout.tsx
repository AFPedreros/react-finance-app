"use client";

import { cn } from "@nextui-org/theme";
import { ReactNode, useEffect, useState } from "react";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

import { Sidebar } from "@/components/sidebar";

type AppLayoutProps = {
  children: ReactNode;
  defaultIsCollapsed: boolean;
};

export function SidebarLayout({
  children,
  defaultIsCollapsed,
}: AppLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultIsCollapsed);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isCompact = isCollapsed || isMobile;

  useEffect(() => {
    document.cookie = `isCollapsed=${isCollapsed}`;
  }, [isCollapsed]);

  return (
    <div className="flex w-full">
      <Sidebar isCompact={isCompact} setIsCollapsed={setIsCollapsed} />

      <div
        className={cn(
          "w-full flex-1 pl-16 transition-all duration-300 md:pl-72",
          { "md:pl-16": isCompact },
        )}
      >
        {children}
      </div>
    </div>
  );
}
