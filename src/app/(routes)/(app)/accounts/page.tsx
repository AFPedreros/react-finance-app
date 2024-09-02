import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import { SearchInput } from "@/components/search-input";
import { AccountsTable } from "@/features/accounts/components/accounts-table";
import { CreateAccountDrawer } from "@/features/accounts/components/create-account-drawer";
import { TotalBalanceChip } from "@/features/accounts/components/total-balance-chip";

export default function AccountsPage() {
  return (
    <main className="flex h-[calc(100vh-64px)] flex-col gap-y-6 p-6">
      <div className="flex items-center">
        <h1 className="inline w-full bg-gradient-to-b from-[#5EA2EF] to-[#0072F5] bg-clip-text text-4xl font-semibold tracking-tight text-primary text-transparent lg:text-6xl">
          Accounts
        </h1>

        <CreateAccountDrawer />
      </div>

      <Card
        isBlurred
        className="h-full overflow-hidden border-transparent bg-white/5 backdrop-blur-lg backdrop-saturate-[1.8] dark:bg-content1"
      >
        <CardHeader className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <TotalBalanceChip />
          <SearchInput className="ml-auto max-w-80" />
        </CardHeader>

        <Divider />

        <CardBody className="overflow-auto">
          <AccountsTable />
        </CardBody>
      </Card>
    </main>
  );
}
