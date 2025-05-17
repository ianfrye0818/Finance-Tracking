import { AccountsOverview } from '@/components/accounts/AccountsOverview'
import { BudgetSummary } from '@/components/budgets/BudgetSummary'
import { DashboardHeader } from '@/components/DashboardHeader'
import { DashboardShell } from '@/components/DashboardShell'
import { RecentTransactions } from '@/components/transactions/RecentTransactions'
import { UpcomingTransactions } from '@/components/transactions/UpcomingTransactions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/dashboard/')({
  component: DashboardPage,
})

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Financial Dashboard"
        text="Track your accounts, transactions, and budgets in one place."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AccountsOverview />
        <BudgetSummary />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <RecentTransactions />
        <UpcomingTransactions />
      </div>
    </DashboardShell>
  )
}
