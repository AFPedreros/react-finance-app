import React from "react";

export function AccountsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-start justify-center gap-4 md:flex-row">
      {children}
    </section>
  );
}
