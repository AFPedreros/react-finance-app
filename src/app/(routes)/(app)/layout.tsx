import { ReactNode } from "react";

import { Sidebar } from "@/components/sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <Sidebar />

      <div className="w-full flex-1 pl-16 transition-all duration-300 md:pl-72">
        {children}
      </div>
    </div>
  );
}
