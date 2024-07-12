import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { AccountsTable } from "@/components/accounts/accounts-table";
import { CreateAccountModal } from "@/components/accounts/create-account-modal";
import { subtitle } from "@/components/primitives";
import { SearchInput } from "@/components/search-input";

export const dynamic = "force-dynamic";

export default function AccountsPage() {
  return (
    <div className="flex flex-col w-full gap-4">
      <Card
        isBlurred
        className="dark:bg-content1 border-transparent bg-white/5 backdrop-blur-lg backdrop-saturate-[1.8]"
      >
        <CardHeader className="flex-col items-start gap-y-2 md:flex-row md:items-center md:justify-between">
          <h1 className={subtitle()}>Accounts</h1>

          <CreateAccountModal />
        </CardHeader>
        <CardBody className="space-y-4 ">
          <SearchInput className="max-w-sm" />
          <AccountsTable />
        </CardBody>
      </Card>
    </div>
  );
}
