'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface Transaction {
  id: number
  date: Date
  payee: string
  amount: number
  account: string
  category: string
  type: 'income' | 'expense'
}

interface AccountBalanceProps {
  className?: string
}

// Mock data for the charts
const balanceHistory = [
  { month: 'Jan', balance: 1200 },
  { month: 'Feb', balance: 1350 },
  { month: 'Mar', balance: 1500 },
  { month: 'Apr', balance: 1450 },
  { month: 'May', balance: 1650 },
  { month: 'Jun', balance: 1800 },
]

const transactions: Transaction[] = [
  {
    id: 1,
    date: new Date(2023, 5, 15),
    payee: 'Payroll',
    amount: 2500,
    account: 'Checking Account',
    category: 'Income',
    type: 'income',
  },
  {
    id: 2,
    date: new Date(2023, 5, 10),
    payee: 'Rent',
    amount: 1200,
    account: 'Checking Account',
    category: 'Housing',
    type: 'expense',
  },
  {
    id: 3,
    date: new Date(2023, 5, 5),
    payee: 'Grocery Store',
    amount: 150,
    account: 'Checking Account',
    category: 'Food',
    type: 'expense',
  },
  {
    id: 4,
    date: new Date(2023, 4, 28),
    payee: 'Electric Company',
    amount: 85,
    account: 'Checking Account',
    category: 'Utilities',
    type: 'expense',
  },
  {
    id: 5,
    date: new Date(2023, 4, 25),
    payee: 'Internet Provider',
    amount: 75,
    account: 'Checking Account',
    category: 'Utilities',
    type: 'expense',
  },
]

export function AccountBalance({ className }: AccountBalanceProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const recentIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const recentExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  // Calculate the maximum balance for proper chart scaling
  const maxBalance = Math.max(...balanceHistory.map((d) => d.balance)) * 1.1

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Account Balance</CardTitle>
        <CardDescription>Track your account balance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="h-[250px] w-full">
              <div className="flex h-full w-full flex-col">
                <div className="flex justify-between text-sm">
                  <div>Balance History</div>
                  <div className="text-muted-foreground">Last 6 months</div>
                </div>
                <div className="mt-4 flex h-[200px] items-end gap-2">
                  {balanceHistory.map((item, index) => (
                    <div
                      key={index}
                      className="group relative flex w-full flex-1 flex-col items-center"
                    >
                      <div className="relative flex h-full w-full items-end justify-center">
                        <div
                          className="w-full rounded-md bg-primary transition-all group-hover:opacity-80"
                          style={{
                            height: `${(item.balance / maxBalance) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {item.month}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border p-4">
                <div className="text-sm font-medium text-muted-foreground">
                  Recent Income
                </div>
                <div className="mt-2 text-2xl font-bold text-green-500">
                  +${recentIncome.toFixed(2)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Last 30 days
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="text-sm font-medium text-muted-foreground">
                  Recent Expenses
                </div>
                <div className="mt-2 text-2xl font-bold text-red-500">
                  -${recentExpenses.toFixed(2)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Last 30 days
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="income" className="space-y-4">
            <div className="h-[250px] w-full">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Income breakdown chart will go here
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recent Income</h3>
              <div className="space-y-2">
                {transactions
                  .filter((t) => t.type === 'income')
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex justify-between rounded-md border p-3"
                    >
                      <div>
                        <div className="font-medium">{transaction.payee}</div>
                        <div className="text-xs text-muted-foreground">
                          {transaction.date.toLocaleDateString()} ·{' '}
                          {transaction.category}
                        </div>
                      </div>
                      <div className="text-green-500">
                        +${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="expenses" className="space-y-4">
            <div className="h-[250px] w-full">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Expense breakdown chart will go here
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recent Expenses</h3>
              <div className="space-y-2">
                {transactions
                  .filter((t) => t.type === 'expense')
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex justify-between rounded-md border p-3"
                    >
                      <div>
                        <div className="font-medium">{transaction.payee}</div>
                        <div className="text-xs text-muted-foreground">
                          {transaction.date.toLocaleDateString()} ·{' '}
                          {transaction.category}
                        </div>
                      </div>
                      <div className="text-red-500">
                        -${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
