import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { createFileRoute } from "@tanstack/react-router";

import { AccountsLayout } from "@/components/layouts/accounts-layout";
import { SearchInput } from "@/components/ui/search-input";
import { AccountsTable } from "@/features/accounts/components/accounts-table";
import { CreateAccountModal } from "@/features/accounts/components/create-account-drawer";
import { title } from "@/features/theme/components/primitives";

export const Route = createFileRoute("/accounts")({
  component: Accounts,
});

function Accounts() {
  return (
    <AccountsLayout>
      <div className="flex w-full flex-col gap-4">
        <Card
          isBlurred
          className="border-transparent bg-white/5 backdrop-blur-lg backdrop-saturate-[1.8] dark:bg-content1"
        >
          <CardHeader>
            <h1 className={title({ size: "sm" })}>Accounts</h1>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex flex-col items-center gap-y-2 md:flex-row md:items-center md:justify-between">
              <SearchInput className="md:max-w-sm" />
              <CreateAccountModal />
            </div>
            <AccountsTable />
          </CardBody>
        </Card>
      </div>
    </AccountsLayout>
  );
}
