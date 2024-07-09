import { Card, CardHeader } from "@nextui-org/card";

import { CreateAccountModal } from "@/components/create-account-modal";
import { title } from "@/components/primitives";

export default function AccountsPage() {
  return (
    <div className="flex flex-col w-full gap-4">
      <Card
        isBlurred
        className="dark:bg-default-400/10 border-transparent bg-white/5 backdrop-blur-lg backdrop-saturate-[1.8]"
      >
        <CardHeader className="gap-y-2 flex-col items-start md:flex-row md:items-center md:justify-between">
          <h1 className={title({ size: "sm" })}>Accounts</h1>

          <CreateAccountModal />
        </CardHeader>
      </Card>

      {/* <ExpensesTable /> */}
    </div>
  );
}
