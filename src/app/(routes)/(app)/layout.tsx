import { CookiesProvider } from "next-client-cookies/server";
import { cookies } from "next/headers";
import { ReactNode } from "react";

import { SidebarLayout } from "@/components/sidebar-layout";

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = cookies();
  const isCollapsedCookie = cookieStore.get("isCollapsed");
  const defaultIsCollapsed = isCollapsedCookie
    ? JSON.parse(isCollapsedCookie.value)
    : false;

  return (
    <CookiesProvider>
      <SidebarLayout defaultIsCollapsed={defaultIsCollapsed}>
        {children}
      </SidebarLayout>
    </CookiesProvider>
  );
}
