import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { ThemeProvider } from "./features/theme/providers/theme-provider";

const queryClient = new QueryClient();

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NextUIProvider>{children}</NextUIProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
