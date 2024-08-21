"use client";

import { Skeleton } from "@nextui-org/skeleton";
import { Spinner } from "@nextui-org/spinner";
import { cn } from "@nextui-org/theme";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

import { getLoadingCreateHelloQueryOptions, useHello } from "../api/get-hello";

function HelloMessage() {
  const { data } = useHello({ message: "Client" });
  const { data: isLoading } = useQuery(getLoadingCreateHelloQueryOptions());

  return (
    <code
      className={cn({
        "flex items-center opacity-50": isLoading?.loading,
      })}
    >
      {data.message}
      {isLoading?.loading && <Spinner className="ml-2" size="sm" />}
    </code>
  );
}

export function ClientHello() {
  return (
    <Suspense
      fallback={
        <div className="flex h-6 w-full items-center justify-center">
          <Skeleton className="h-4 w-full min-w-36 rounded-md bg-default-300" />
        </div>
      }
    >
      <HelloMessage />
    </Suspense>
  );
}
