import { Transaction } from "../types";

export const months = [
  { key: "january", label: "January" },
  { key: "february", label: "February" },
  { key: "march", label: "March" },
  { key: "april", label: "April" },
  { key: "may", label: "May" },
  { key: "june", label: "June" },
  { key: "july", label: "July" },
  { key: "august", label: "August" },
  { key: "september", label: "September" },
  { key: "october", label: "October" },
  { key: "november", label: "November" },
  { key: "december", label: "December" },
];

export const typesOfTransaction = [
  { key: "income", label: "Income" },
  { key: "expenses", label: "Expenses" },
  { key: "savings", label: "Savings" },
];

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    name: "Groceries",
    category: "Home",
    amount: 49.23,
    date: new Date(),
    icon: "💳",
    type: "expense",
  },
  {
    id: "2",
    name: "Netflix",
    category: "Home",
    amount: 17.99,
    date: new Date(),
    icon: "🎬",
    type: "expense",
  },
  {
    id: "3",
    name: "Income",
    category: "Personal",
    amount: 6000,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    icon: "💰",
    type: "income",
  },
];
