"use client";

import { cn } from "@nextui-org/theme";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isCompact = isCollapsed || isMobile;

  return (
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
  );
}
