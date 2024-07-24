import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { Providers } from "../providers";

import { RootLayout } from "@/components/layouts";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <Providers>
      <RootLayout>
        <Outlet />
        <TanStackRouterDevtools />
      </RootLayout>
    </Providers>
  );
}
