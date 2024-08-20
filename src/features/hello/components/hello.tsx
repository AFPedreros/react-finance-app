"use client";

import { Skeleton } from "@nextui-org/skeleton";

import { useHello } from "../api/get-hello";

export function Hello() {
  const { data, isLoading } = useHello();

  if (isLoading) {
    return (
      <div className="flex h-6 w-full items-center justify-center">
        <Skeleton className="h-4 w-full min-w-36 rounded-full bg-default-300" />
      </div>
    );
  }

  return <code>{data?.message ?? "No hubo respuesta"}</code>;
}
