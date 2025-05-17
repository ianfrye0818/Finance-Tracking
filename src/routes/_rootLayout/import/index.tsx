import { DashboardHeader } from '@/components/DashboardHeader'
import { DashboardShell } from '@/components/DashboardShell'
import { TransactionImporter } from '@/components/imports/TransactionImporter'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/import/')({
  component: ImportPage,
})

export default function ImportPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Import Transactions"
        text="Import transactions from your bank or financial institution using CSV files."
      />
      <TransactionImporter />
    </DashboardShell>
  )
}
