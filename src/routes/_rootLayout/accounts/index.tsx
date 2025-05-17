import { AccountBalance } from '@/components/accounts/AccountBalance'
import { AccountsList } from '@/components/accounts/AccountLists'
import { DashboardHeader } from '@/components/DashboardHeader'
import { DashboardShell } from '@/components/DashboardShell'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/accounts/')({
  component: AccountsPage,
})

export default function AccountsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Accounts"
        text="Manage your financial accounts and track balances."
      />
      <div className="grid gap-4 md:grid-cols-7">
        <AccountsList className="md:col-span-3" />
        <AccountBalance className="md:col-span-4" />
      </div>
    </DashboardShell>
  )
}
