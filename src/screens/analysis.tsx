import { ComparedChart } from "@/components/compaire";
import { IncomeChart } from "@/components/income-chart";
import { MostExpenses } from "@/components/most-expenses-month";
export default function Analysis() {
  return (
    <main className="mb-16 space-y-6">
      <ComparedChart />
      <MostExpenses />
      <IncomeChart />
    </main>
  );
}
