import { AccountsCard } from "@/features/accounts/components/accounts-card";
import { CreateAccountDrawer } from "@/features/accounts/components/create-account-drawer";
import { TotalBalanceChip } from "@/features/accounts/components/total-balance-chip";

export default function AccountsPage() {
  return (
    <main className="flex h-[calc(100vh-64px)] flex-col gap-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="inline w-fit bg-gradient-to-b from-[#5EA2EF] to-[#0072F5] bg-clip-text text-4xl font-bold leading-normal tracking-tight text-transparent lg:text-3xl">
            Accounts
          </h1>
          <TotalBalanceChip />
        </div>

        <CreateAccountDrawer />
      </div>

      <AccountsCard />
    </main>
  );
}
