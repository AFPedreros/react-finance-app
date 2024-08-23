"use client";

import { cn } from "@nextui-org/theme";
import { ReactNode, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isCompact = isCollapsed || isMobile;

  return (
    <div className="flex w-full">
      <aside
        className={cn(
          "fixed flex h-[calc(100dvh-4rem)] w-72 flex-col !border-r-small border-divider p-6 transition-width",
          {
            "w-16 items-center px-2 py-6": isCompact,
          },
        )}
      >
        Sidebar
      </aside>

      <div className="w-full flex-1 pl-72">{children}</div>
    </div>
  );
}
