import React from "react";

import { Navbar } from "../ui/navbar";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen flex-col">
      <Navbar />
      <main className="container mx-auto max-w-7xl flex-grow p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
