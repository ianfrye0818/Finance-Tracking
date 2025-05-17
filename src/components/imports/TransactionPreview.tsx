'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { format } from 'date-fns'

interface TransactionPreviewProps {
  transactions: any[]
  onConfirm: () => void
  onBack: () => void
}

export function TransactionPreview({
  transactions,
  onConfirm,
  onBack,
}: TransactionPreviewProps) {
  const [selectedTransactions, setSelectedTransactions] = useState<number[]>(
    transactions.map((_, index) => index),
  )
  const [accountOptions] = useState([
    'Checking Account',
    'Savings Account',
    'Credit Card',
    'Investment Account',
    'Emergency Fund',
  ])
  const [editableTransactions, setEditableTransactions] = useState(transactions)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(transactions.map((_, index) => index))
    } else {
      setSelectedTransactions([])
    }
  }

  const handleSelectTransaction = (index: number, checked: boolean) => {
    if (checked) {
      setSelectedTransactions([...selectedTransactions, index])
    } else {
      setSelectedTransactions(selectedTransactions.filter((i) => i !== index))
    }
  }

  const handleUpdateTransaction = (
    index: number,
    field: string,
    value: any,
  ) => {
    const updatedTransactions = [...editableTransactions]
    updatedTransactions[index] = {
      ...updatedTransactions[index],
      [field]: value,
    }
    setEditableTransactions(updatedTransactions)
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MM/dd/yyyy')
    } catch (e) {
      return dateString
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-medium">Preview Transactions</h2>
        <p className="text-muted-foreground">
          Review and edit your transactions before importing. Select the
          transactions you want to import.
        </p>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedTransactions.length === transactions.length}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all transactions"
                />
              </TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payee</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {editableTransactions.map((transaction, index) => (
              <TableRow
                key={index}
                className={
                  selectedTransactions.includes(index) ? '' : 'opacity-50'
                }
              >
                <TableCell>
                  <Checkbox
                    checked={selectedTransactions.includes(index)}
                    onCheckedChange={(checked) =>
                      handleSelectTransaction(index, !!checked)
                    }
                    aria-label={`Select transaction ${index + 1}`}
                  />
                </TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>
                  <Input
                    value={transaction.payee || ''}
                    onChange={(e) =>
                      handleUpdateTransaction(index, 'payee', e.target.value)
                    }
                    className="h-8 w-full"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={transaction.amount || ''}
                    onChange={(e) => {
                      const value = Number.parseFloat(e.target.value)
                      if (!isNaN(value)) {
                        handleUpdateTransaction(index, 'amount', value)
                      }
                    }}
                    className="h-8 w-24"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={transaction.category || ''}
                    onChange={(e) =>
                      handleUpdateTransaction(index, 'category', e.target.value)
                    }
                    className="h-8 w-full"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={transaction.account || 'Checking Account'}
                    onValueChange={(value) =>
                      handleUpdateTransaction(index, 'account', value)
                    }
                  >
                    <SelectTrigger className="h-8 w-[150px]">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accountOptions.map((account) => (
                        <SelectItem key={account} value={account}>
                          {account}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    value={transaction.notes || ''}
                    onChange={(e) =>
                      handleUpdateTransaction(index, 'notes', e.target.value)
                    }
                    className="h-8 w-full"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {selectedTransactions.length} of {transactions.length} transactions
            selected
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            onClick={onConfirm}
            disabled={selectedTransactions.length === 0}
          >
            Import {selectedTransactions.length} Transactions
          </Button>
        </div>
      </div>
    </div>
  )
}
