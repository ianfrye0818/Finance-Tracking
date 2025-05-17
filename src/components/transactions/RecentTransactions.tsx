import { useState } from 'react'
import { format } from 'date-fns'
import { Plus, Search } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { AddTransactionDialog } from './AddTransactionDialog'

export function RecentTransactions() {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: new Date(2023, 4, 15),
      payee: 'Grocery Store',
      amount: -120.5,
      account: 'Checking Account',
      category: 'Food',
      subcategory: 'Groceries',
      tags: ['essential'],
      notes: 'Weekly grocery shopping',
    },
    {
      id: 2,
      date: new Date(2023, 4, 14),
      payee: 'Coffee Shop',
      amount: -4.75,
      account: 'Credit Card',
      category: 'Food',
      subcategory: 'Dining Out',
      tags: ['coffee', 'work'],
      notes: '',
    },
    {
      id: 3,
      date: new Date(2023, 4, 10),
      payee: 'Payroll',
      amount: 1500.0,
      account: 'Checking Account',
      category: 'Income',
      subcategory: 'Salary',
      tags: ['work'],
      notes: 'Bi-weekly paycheck',
    },
    {
      id: 4,
      date: new Date(2023, 4, 5),
      payee: 'Internet Provider',
      amount: -75.99,
      account: 'Checking Account',
      category: 'Utilities',
      subcategory: 'Internet',
      tags: ['bills', 'monthly'],
      notes: 'Monthly internet bill',
    },
  ])

  const filteredTransactions = transactions
    .filter((transaction) => {
      const searchLower = searchQuery.toLowerCase()
      return (
        transaction.payee.toLowerCase().includes(searchLower) ||
        transaction.category.toLowerCase().includes(searchLower) ||
        transaction.subcategory.toLowerCase().includes(searchLower) ||
        transaction.tags.some((tag) =>
          tag.toLowerCase().includes(searchLower),
        ) ||
        transaction.notes.toLowerCase().includes(searchLower)
      )
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activities</CardDescription>
        </div>
        <Button size="sm" onClick={() => setIsAddTransactionOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-col space-y-2 border-b pb-3 last:border-0"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {transaction.payee}
                    </p>
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
                    {transaction.subcategory}
                  </Badge>
                  {transaction.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {transaction.notes && (
                  <p className="text-xs text-muted-foreground">
                    {transaction.notes}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground py-4">
              No transactions found
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
          View All Transactions
        </Button>
      </CardFooter>
      <AddTransactionDialog
        open={isAddTransactionOpen}
        onOpenChange={setIsAddTransactionOpen}
        accounts={['Checking Account', 'Savings Account', 'Credit Card']}
        onAddTransaction={(transaction) => {
          setTransactions([
            ...transactions,
            { ...transaction, id: transactions.length + 1 },
          ])
        }}
      />
    </Card>
  )
}
