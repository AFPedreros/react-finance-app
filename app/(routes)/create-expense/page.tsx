import { CreateExpenseForm } from "@/components/expenses/create-expense-form";
import { title } from "@/components/primitives";

export default function CreateExpensePage() {
  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className={title()}>Create Expense</h1>
      <CreateExpenseForm />
    </div>
  );
}
