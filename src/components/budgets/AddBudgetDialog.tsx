'use client'

import type React from 'react'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface AddBudgetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddBudget: (budget: {
    category: string
    budgeted: number
    spent: number
    period: string
  }) => void
}

export function AddBudgetDialog({
  open,
  onOpenChange,
  onAddBudget,
}: AddBudgetDialogProps) {
  const [category, setCategory] = useState('')
  const [budgeted, setBudgeted] = useState('')
  const [period, setPeriod] = useState('monthly')

  const categories = [
    'Food',
    'Housing',
    'Transportation',
    'Entertainment',
    'Utilities',
    'Healthcare',
    'Personal',
    'Education',
    'Shopping',
    'Other',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddBudget({
      category,
      budgeted: Number.parseFloat(budgeted) || 0,
      spent: 0, // New budgets start with 0 spent
      period,
    })
    setCategory('')
    setBudgeted('')
    setPeriod('monthly')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
          <DialogDescription>
            Set up a budget to track your spending in a category.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="budgeted">Budget Amount</Label>
              <Input
                id="budgeted"
                type="number"
                step="0.01"
                value={budgeted}
                onChange={(e) => setBudgeted(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="period">Budget Period</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger id="period">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Budget</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
