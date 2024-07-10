import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { AccountsTable } from "@/components/accounts-table";
import { CreateAccountModal } from "@/components/create-account-modal";
import { subtitle } from "@/components/primitives";

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
        <CardBody>
          {/* <SearchInput /> */}
          <AccountsTable />
        </CardBody>
      </Card>
    </div>
  );
}
