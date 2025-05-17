import { BudgetOverview } from '@/components/budgets/BudgetOverView'
import { CategoryBreakdown } from '@/components/budgets/CategoryBreakdown'
import { DashboardHeader } from '@/components/DashboardHeader'
import { DashboardShell } from '@/components/DashboardShell'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/budgets/')({
  component: BudgetsPage,
})

export default function BudgetsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Budgets"
        text="Create and manage your monthly and weekly budgets."
      />
      <div className="grid gap-4 md:grid-cols-7">
        <BudgetOverview className="md:col-span-4" />
        <CategoryBreakdown className="md:col-span-3" />
      </div>
    </DashboardShell>
  )
}
