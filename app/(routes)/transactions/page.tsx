import { ExpensesCard } from "@/components/expenses/expenses-card";
import { ExpensesTable } from "@/components/expenses/expenses-table";
import { title } from "@/components/primitives";

export default function ExpensesPage() {
  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className={title()}>Expenses</h1>

      <ExpensesCard />

      <ExpensesTable />
    </div>
  );
}
