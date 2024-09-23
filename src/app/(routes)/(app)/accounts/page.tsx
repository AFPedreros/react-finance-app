import { AccountsCard } from "@/features/accounts/components/accounts-card";
import { CreateAccountDrawer } from "@/features/accounts/components/create-account-drawer";

export default function AccountsPage() {
  return (
    <main className="flex h-[calc(100vh-64px)] flex-col gap-y-6 p-6">
      <div className="flex items-center">
        <h1 className="mr-6 inline w-fit bg-gradient-to-b from-[#5EA2EF] to-[#0072F5] bg-clip-text text-4xl font-semibold tracking-tight text-primary text-transparent lg:text-6xl">
          Accounts
        </h1>

        <CreateAccountDrawer />
      </div>

      <AccountsCard />
    </main>
  );
}
