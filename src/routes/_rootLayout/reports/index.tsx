import { DashboardHeader } from '@/components/DashboardHeader'
import { DashboardShell } from '@/components/DashboardShell'
import { ExpensesByCategory } from '@/components/reports/ExpensesByCategory'
import { IncomeVsExpenses } from '@/components/reports/IncomeVsExpense'
import { MonthlyTrends } from '@/components/reports/MonthlyTrends'
import { ReportsOverview } from '@/components/reports/ReportsOverview'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/reports/')({
  component: ReportsPage,
})

export default function ReportsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Reports & Analytics"
        text="View detailed reports and analytics about your finances."
      />
      <ReportsOverview />
      <div className="grid gap-4 md:grid-cols-2">
        <ExpensesByCategory />
        <IncomeVsExpenses />
      </div>
      <MonthlyTrends />
    </DashboardShell>
  )
}
