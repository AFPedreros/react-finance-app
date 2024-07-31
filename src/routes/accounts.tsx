import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { AccountsLayout } from "@/components/layouts/accounts-layout";
import { SearchInput } from "@/components/ui/search-input";
import { getTotalBalanceAccountsQueryOptions } from "@/features/accounts/api/get-total-balance-accounts";
import { AccountsTable } from "@/features/accounts/components/accounts-table";
import { CreateAccountDrawer } from "@/features/accounts/components/create-account-drawer";
import { title } from "@/features/theme/components/primitives";
import { formatCurrency } from "@/utils/format-currency";

export const Route = createFileRoute("/accounts")({
  component: Accounts,
});

function Accounts() {
  const { data, isPending } = useQuery(getTotalBalanceAccountsQueryOptions);

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
              {/*Todo: mover el loading a un componente con el chip*/}
              {data && (
                <Chip className="mr-2" color="success" variant="faded">
                  Total: {formatCurrency(data.totalBalance ?? "0")}
                </Chip>
              )}
              <CreateAccountDrawer />
            </div>
            <AccountsTable />
          </CardBody>
        </Card>
      </div>
    </AccountsLayout>
  );
}
