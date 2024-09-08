"use client";

import { NextUIProvider } from "@nextui-org/system";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ViewTransitions } from "next-view-transitions";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { queryClient } from "@/lib/react-query";

export type ProvidersProps = {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
};

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <NextUIProvider navigate={router.push}>
          <NextThemesProvider {...themeProps}>
            <ViewTransitions>{children}</ViewTransitions>
          </NextThemesProvider>
        </NextUIProvider>
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
