import { api } from "@/lib/api-client";

export type Transaction = {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: Date;
  icon: string;
  type: TransactionType;
};

export type TransactionType = keyof typeof api.transactions.total;
