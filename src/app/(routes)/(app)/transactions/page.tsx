import { CreateTransactionDrawer } from "@/features/transactions/components/create-transaction-drawer";
import { MonthSelect } from "@/features/transactions/components/month-select";
import { TransactionCard } from "@/features/transactions/components/transaction-card";
import { months } from "@/features/transactions/lib/utils";

export default function TransactionsPage() {
  const now = new Date();
  const currentMonth = months[now.getMonth()].key;

  return (
    <main className="flex h-[calc(100vh-64px)] flex-col gap-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="inline w-fit bg-gradient-to-b from-[#5EA2EF] to-[#0072F5] bg-clip-text text-4xl font-bold leading-normal tracking-tight text-transparent">
          Transactions
        </h1>

        <div className="flex items-center gap-4">
          <MonthSelect currentMonth={currentMonth} />
          <CreateTransactionDrawer />
        </div>
      </div>

      <div className="flex gap-3">
        <TransactionCard
          amount="Create a new Direct Employee Agreement template."
          color="success"
          icon="solar:arrow-right-down-outline"
          title="Income"
        />
        <TransactionCard
          amount="Edit the Direct Employee Agreement template."
          color="danger"
          icon="solar:arrow-left-up-outline"
          title="Expenses"
        />
        <TransactionCard
          amount="Edit the Direct Employee Agreement template."
          color="secondary"
          icon="solar:money-bag-outline"
          title="Savings"
        />
      </div>
      {/* <TransactionsCard /> */}
    </main>
  );
}
