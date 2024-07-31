import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { createFileRoute } from "@tanstack/react-router";

import { AccountsLayout } from "@/components/layouts/accounts-layout";
import { SearchInput } from "@/components/ui/search-input";
import { AccountsTable } from "@/features/accounts/components/accounts-table";
import { CreateAccountDrawer } from "@/features/accounts/components/create-account-drawer";
import { TotalBalanceChip } from "@/features/accounts/components/total-balance-chip";
import { title } from "@/features/theme/components/primitives";

export const Route = createFileRoute("/accounts")({
  component: Accounts,
});

function Accounts() {
  return (
    <AccountsLayout>
      <div className="flex w-full flex-col gap-4 md:max-w-sm">
        <Card
          isBlurred
          className="border-transparent bg-white/5 backdrop-blur-lg backdrop-saturate-[1.8] dark:bg-content1"
        >
          <CardHeader className="flex items-center justify-between">
            <h1 className={title({ size: "sm" })}>Accounts</h1>
            <TotalBalanceChip />
          </CardHeader>
          <CardBody className="space-y-4">
            <SearchInput />
            <CreateAccountDrawer />
          </CardBody>
        </Card>
      </div>
      <div className="flex w-full flex-col gap-4">
        <Card
          isBlurred
          className="border-transparent bg-white/5 backdrop-blur-lg backdrop-saturate-[1.8] dark:bg-content1"
        >
          <CardBody className="space-y-4">
            <AccountsTable />
          </CardBody>
        </Card>
      </div>
    </AccountsLayout>
  );
}
