import { useState } from 'react'
import { format, isFuture } from 'date-fns'
import { Bell, Plus } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AddTransactionDialog } from './AddTransactionDialog'

export function UpcomingTransactions() {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: new Date(2023, 5, 1), // Future date
      payee: 'Rent',
      amount: -1200.0,
      account: 'Checking Account',
      category: 'Housing',
      subcategory: 'Rent',
      tags: ['bills', 'monthly'],
      notes: 'Monthly rent payment',
      reminder: true,
    },
    {
      id: 2,
      date: new Date(2023, 4, 25), // Future date
      payee: 'Electric Company',
      amount: -85.0,
      account: 'Checking Account',
      category: 'Utilities',
      subcategory: 'Electricity',
      tags: ['bills', 'monthly'],
      notes: 'Monthly electricity bill',
      reminder: true,
    },
    {
      id: 3,
      date: new Date(2023, 4, 28), // Future date
      payee: 'Payroll',
      amount: 1500.0,
      account: 'Checking Account',
      category: 'Income',
      subcategory: 'Salary',
      tags: ['work'],
      notes: 'Bi-weekly paycheck',
      reminder: false,
    },
  ])

  // Filter to only show future transactions
  const upcomingTransactions = transactions
    .filter((transaction) => isFuture(transaction.date))
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Upcoming Transactions</CardTitle>
          <CardDescription>Future bills and income</CardDescription>
        </div>
        <Button size="sm" onClick={() => setIsAddTransactionOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Planned
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingTransactions.length > 0 ? (
            upcomingTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-col space-y-2 border-b pb-3 last:border-0"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium leading-none">
                        {transaction.payee}
                      </p>
                      {transaction.reminder && (
                        <Bell className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {format(transaction.date, 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div
                    className={`text-base font-bold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}
                  >
                    {transaction.amount < 0 ? '-' : '+'}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline">{transaction.category}</Badge>
                  <Badge variant="outline" className="bg-muted">
                    {transaction.account}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground py-4">
              No upcoming transactions
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsAddTransactionOpen(true)}
        >
          View All Planned
        </Button>
      </CardFooter>
      <AddTransactionDialog
        open={isAddTransactionOpen}
        onOpenChange={setIsAddTransactionOpen}
        accounts={['Checking Account', 'Savings Account', 'Credit Card']}
        onAddTransaction={(transaction) => {
          setTransactions([
            ...transactions,
            {
              ...transaction,
              id: transactions.length + 1,
              reminder: true,
            },
          ])
        }}
      />
    </Card>
  )
}
