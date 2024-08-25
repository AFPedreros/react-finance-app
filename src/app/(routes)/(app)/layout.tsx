"use client";

import { cn } from "@nextui-org/theme";
import { ReactNode } from "react";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

import { Sidebar } from "@/components/sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useLocalStorage("isCollapsed", false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isCompact = isCollapsed || isMobile;

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
