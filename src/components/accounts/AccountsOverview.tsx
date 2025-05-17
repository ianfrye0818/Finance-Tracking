'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AddAccountDialog } from './AddAccountDialog'

export function AccountsOverview() {
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Checking Account', balance: 2543.87, type: 'checking' },
    { id: 2, name: 'Savings Account', balance: 12750.52, type: 'savings' },
    { id: 3, name: 'Credit Card', balance: -450.33, type: 'credit' },
  ])

  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0,
  )

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Accounts</CardTitle>
          <CardDescription>Manage your financial accounts</CardDescription>
        </div>
        <Button size="sm" onClick={() => setIsAddAccountOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {accounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {account.name}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {account.type}
                </p>
              </div>
              <div
                className={`text-lg font-bold ${account.balance < 0 ? 'text-red-500' : ''}`}
              >
                ${account.balance.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <p className="text-sm font-medium">Total Balance</p>
          <p
            className={`text-xl font-bold ${totalBalance < 0 ? 'text-red-500' : ''}`}
          >
            ${totalBalance.toFixed(2)}
          </p>
        </div>
      </CardFooter>
      <AddAccountDialog
        open={isAddAccountOpen}
        onOpenChange={setIsAddAccountOpen}
        onAddAccount={(account) => {
          setAccounts([...accounts, { ...account, id: accounts.length + 1 }])
        }}
      />
    </Card>
  )
}
