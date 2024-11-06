import { CreateTransactionDrawer } from "@/features/transactions/components/create-transaction-drawer";
import { MonthSelect } from "@/features/transactions/components/month-select";

export default function TransactionsPage() {
  return (
    <main className="flex h-[calc(100vh-64px)] flex-col gap-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="inline w-fit bg-gradient-to-b from-[#5EA2EF] to-[#0072F5] bg-clip-text text-4xl font-bold leading-normal tracking-tight text-transparent">
          Transactions
        </h1>

        <div className="flex items-center gap-4">
          <MonthSelect />
          <CreateTransactionDrawer />
        </div>
      </div>

      {/* <TransactionsCard /> */}
    </main>
  );
}
