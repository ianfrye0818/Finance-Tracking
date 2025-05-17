import { DashboardHeader } from '@/components/DashboardHeader'
import { DashboardShell } from '@/components/DashboardShell'
import { TransactionsTable } from '@/components/transactions/TransactionsTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/transactions/')({
  component: TransactionsPage,
})

export default function TransactionsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Transactions"
        text="View and manage all your financial transactions."
      />
      <TransactionsTable />
    </DashboardShell>
  )
}
