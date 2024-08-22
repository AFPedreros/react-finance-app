import "@/styles/index.css";

import * as React from "react";
import { Toaster } from "sonner";

import { Providers } from "../providers";

import { Navbar } from "@/components/navbar";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={fontSans.className}>
        <Providers
          themeProps={{ attribute: "class", defaultTheme: "dark", children }}
        >
          <div className="relative flex h-screen flex-col">
            <Navbar />
            <main className="container mx-auto max-w-7xl flex-grow px-6">
              {children}
              <Toaster richColors />
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
