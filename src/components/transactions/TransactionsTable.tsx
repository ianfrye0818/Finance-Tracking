import { useState } from 'react'
import { format } from 'date-fns'
import {
  ArrowUpDown,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  XCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { AddTransactionDialog } from './AddTransactionDialog'
import { DeleteTransactionDialog } from './DeleteTransactionDialog'
import { EditTransactionDialog } from './EditTransactionDialog'
import { DatePicker } from '../ui/DatePicker'

// Example transaction data
const initialTransactions = [
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
  {
    id: 5,
    date: new Date(2023, 4, 3),
    payee: 'Electricity Company',
    amount: -98.45,
    account: 'Checking Account',
    category: 'Utilities',
    subcategory: 'Electricity',
    tags: ['bills', 'monthly'],
    notes: 'Monthly electricity bill',
  },
  {
    id: 6,
    date: new Date(2023, 4, 2),
    payee: 'Rent',
    amount: -1200.0,
    account: 'Checking Account',
    category: 'Housing',
    subcategory: 'Rent',
    tags: ['essential', 'monthly'],
    notes: 'Monthly rent payment',
  },
  {
    id: 7,
    date: new Date(2023, 4, 1),
    payee: 'Gas Station',
    amount: -45.6,
    account: 'Credit Card',
    category: 'Transportation',
    subcategory: 'Gas',
    tags: ['car'],
    notes: 'Filled up gas tank',
  },
]

export function TransactionsTable() {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<{ from: Date; to?: Date }>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // First day of current month
    to: new Date(),
  })
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: 'ascending' | 'descending'
  }>({
    key: 'date',
    direction: 'descending',
  })
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<any | null>(null)
  const [deletingTransaction, setDeletingTransaction] = useState<number | null>(
    null,
  )
  const [selectedTransactions, setSelectedTransactions] = useState<number[]>([])

  // Filter transactions based on search, category, account, and date range
  // const filteredTransactions = transactions.filter((transaction) => {
  //   const matchesSearch =
  //     searchQuery === '' ||
  //     transaction.payee.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     transaction.subcategory
  //       .toLowerCase()
  //       .includes(searchQuery.toLowerCase()) ||
  //     transaction.tags.some((tag) =>
  //       tag.toLowerCase().includes(searchQuery.toLowerCase()),
  //     ) ||
  //     transaction.notes.toLowerCase().includes(searchQuery.toLowerCase())

  //   const matchesCategory =
  //     selectedCategory === null || transaction.category === selectedCategory
  //   const matchesAccount =
  //     selectedAccount === null || transaction.account === selectedAccount

  //   const transactionDate = new Date(transaction.date)
  //   const matchesDateRange =
  //     (dateRange.from === null || transactionDate >= dateRange.from) &&
  //     (dateRange.to === null || transactionDate <= dateRange.to!)

  //   return (
  //     matchesSearch && matchesCategory && matchesAccount && matchesDateRange
  //   )
  // })

  // Sort transactions
  const sortedTransactions = [...transactions].sort((a, b) => {
    const key = sortConfig.key as keyof typeof a

    if (key === 'amount') {
      return sortConfig.direction === 'ascending'
        ? a[key] - b[key]
        : b[key] - a[key]
    } else if (key === 'date') {
      return sortConfig.direction === 'ascending'
        ? new Date(a[key]).getTime() - new Date(b[key]).getTime()
        : new Date(b[key]).getTime() - new Date(a[key]).getTime()
    } else {
      const aVal = String(a[key]).toLowerCase()
      const bVal = String(b[key]).toLowerCase()

      return sortConfig.direction === 'ascending'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }
  })

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const accounts = Array.from(new Set(transactions.map((t) => t.account)))
  const categories = Array.from(new Set(transactions.map((t) => t.category)))

  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id))
    setDeletingTransaction(null)
  }

  const handleUpdateTransaction = (updatedTransaction: any) => {
    setTransactions(
      transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t,
      ),
    )
    setEditingTransaction(null)
  }

  const handleAddTransaction = (transaction: any) => {
    const newId = Math.max(...transactions.map((t) => t.id)) + 1
    const newTransaction = { ...transaction, id: newId }
    setTransactions([...transactions, newTransaction])
    setIsAddTransactionOpen(false)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(sortedTransactions.map((t) => t.id))
    } else {
      setSelectedTransactions([])
    }
  }

  const handleSelectTransaction = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedTransactions([...selectedTransactions, id])
    } else {
      setSelectedTransactions(selectedTransactions.filter((t) => t !== id))
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setSelectedAccount(null)
    setDateRange({
      from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      to: new Date(),
    })
  }

  return (
    <Card>
      <CardHeader className="px-6 py-5">
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle className="text-2xl">All Transactions</CardTitle>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Button onClick={() => setIsAddTransactionOpen(true)} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="mr-2 h-4 w-4" />
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Manage Transactions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={selectedTransactions.length === 0}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Selected
                </DropdownMenuItem>
                <DropdownMenuItem disabled={selectedTransactions.length === 0}>
                  Categorize Selected
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearFilters}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Clear Filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-4 flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  {(selectedCategory || selectedAccount) && (
                    <Badge variant="secondary" className="ml-2 rounded-sm px-1">
                      {(selectedCategory ? 1 : 0) + (selectedAccount ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Category</h4>
                    <Select
                      value={selectedCategory || ''}
                      onValueChange={(value) =>
                        setSelectedCategory(value || null)
                      }
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='All'>All</SelectItem>
                        {categories.map((category, index) => (
                          <SelectItem key={category || 'Other' + index} value={category || 'Other' + index}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Account</h4>
                    <Select
                      value={selectedAccount || ''}
                      onValueChange={(value) =>
                        setSelectedAccount(value || null)
                      }
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder="All Accounts" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        {accounts.map((account, index) => (
                          <SelectItem key={account || 'Other' + index} value={account || 'Other' + index}>
                            {account}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <DatePicker />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={
                      selectedTransactions.length > 0 &&
                      selectedTransactions.length === sortedTransactions.length
                    }
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="w-[100px]">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8"
                    onClick={() => requestSort('date')}
                  >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8"
                    onClick={() => requestSort('payee')}
                  >
                    Payee
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8"
                    onClick={() => requestSort('category')}
                  >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8"
                    onClick={() => requestSort('account')}
                  >
                    Account
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-mr-3 h-8"
                    onClick={() => requestSort('amount')}
                  >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedTransactions.includes(transaction.id)}
                        onCheckedChange={(checked) =>
                          handleSelectTransaction(transaction.id, !!checked)
                        }
                        aria-label="Select transaction"
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {format(transaction.date, 'MM/dd/yyyy')}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{transaction.payee}</div>
                      <div className="hidden text-xs text-muted-foreground sm:block">
                        {transaction.notes}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col">
                        <span>{transaction.category}</span>
                        <span className="text-xs text-muted-foreground">
                          {transaction.subcategory}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {transaction.account}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={cn(
                          'font-medium',
                          transaction.amount < 0
                            ? 'text-red-500'
                            : 'text-green-500',
                        )}
                      >
                        {transaction.amount < 0 ? '-' : '+'}$
                        {Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-mr-3 h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setEditingTransaction(transaction)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              setDeletingTransaction(transaction.id)
                            }
                            className="text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <AddTransactionDialog
        open={isAddTransactionOpen}
        onOpenChange={setIsAddTransactionOpen}
        accounts={accounts}
        onAddTransaction={handleAddTransaction}
      />

      {editingTransaction && (
        <EditTransactionDialog
          open={!!editingTransaction}
          transaction={editingTransaction}
          accounts={accounts}
          onOpenChange={() => setEditingTransaction(null)}
          onUpdateTransaction={handleUpdateTransaction}
        />
      )}

      {deletingTransaction && (
        <DeleteTransactionDialog
          open={!!deletingTransaction}
          onOpenChange={() => setDeletingTransaction(null)}
          onConfirm={() => handleDeleteTransaction(deletingTransaction)}
        />
      )}
    </Card>
  )
}
