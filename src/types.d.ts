export interface Record {
  id?: number;
  amount: number;
  type: "Expense" | "Income" | "Transfer";
  paymentMethod: string;
  category: string;
  date: Date;
  description: string;
}
