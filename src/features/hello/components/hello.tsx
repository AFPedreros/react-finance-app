import { Skeleton } from "@nextui-org/react";

import { useHello } from "../api/get-hello";

export function Hello() {
  const { data, isLoading } = useHello();

  if (isLoading) {
    return (
      <div className="flex h-6 w-full items-center justify-center">
        <Skeleton className="h-4 w-full min-w-36 rounded-lg bg-default-300" />
      </div>
    );
  }

  if (!data) return null;

  return <code>{data.message}</code>;
}
