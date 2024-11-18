export type Transaction = {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: Date;
  icon: string;
  type: "expense" | "income" | "savings";
};
