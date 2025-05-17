'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, Plus } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { AddBudgetDialog } from './AddBudgetDialog'
import { EditBudgetDialog } from './EditBudgetDialog'

interface Budget {
  id: number
  category: string
  budgeted: number
  spent: number
  period: string
}

interface BudgetOverviewProps {
  className?: string
}

export function BudgetOverview({ className }: BudgetOverviewProps) {
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null)
  const [deletingBudget, setDeletingBudget] = useState<number | null>(null)
  const [budgetPeriod, setBudgetPeriod] = useState('monthly')

  const [budgets, setBudgets] = useState<Budget[]>([
    { id: 1, category: 'Food', budgeted: 500, spent: 320, period: 'monthly' },
    {
      id: 2,
      category: 'Entertainment',
      budgeted: 200,
      spent: 150,
      period: 'monthly',
    },
    {
      id: 3,
      category: 'Transportation',
      budgeted: 300,
      spent: 275,
      period: 'monthly',
    },
    {
      id: 4,
      category: 'Housing',
      budgeted: 1200,
      spent: 1200,
      period: 'monthly',
    },
    {
      id: 5,
      category: 'Utilities',
      budgeted: 250,
      spent: 220,
      period: 'monthly',
    },
    { id: 6, category: 'Coffee', budgeted: 25, spent: 30, period: 'weekly' },
    {
      id: 7,
      category: 'Eating Out',
      budgeted: 50,
      spent: 65,
      period: 'weekly',
    },
    {
      id: 8,
      category: 'Groceries',
      budgeted: 100,
      spent: 85,
      period: 'weekly',
    },
  ])

  const filteredBudgets = budgets.filter(
    (budget) => budget.period === budgetPeriod,
  )

  const totalBudgeted = filteredBudgets.reduce(
    (sum, budget) => sum + budget.budgeted,
    0,
  )
  const totalSpent = filteredBudgets.reduce(
    (sum, budget) => sum + budget.spent,
    0,
  )
  const totalPercentage =
    totalBudgeted > 0
      ? Math.min(Math.round((totalSpent / totalBudgeted) * 100), 100)
      : 0

  const handleAddBudget = (budget: Omit<Budget, 'id'>) => {
    const newId = Math.max(...budgets.map((b) => b.id), 0) + 1
    const newBudget = { ...budget, id: newId }
    setBudgets([...budgets, newBudget])
  }

  const handleUpdateBudget = (updatedBudget: Budget) => {
    setBudgets(
      budgets.map((b) => (b.id === updatedBudget.id ? updatedBudget : b)),
    )
    setEditingBudget(null)
  }

  const handleDeleteBudget = (id: number) => {
    setBudgets(budgets.filter((b) => b.id !== id))
    setDeletingBudget(null)
  }

  return (
    <>
      <Card className={cn(className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Budget Progress</CardTitle>
              <CardDescription>
                Track your spending against your budget
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={budgetPeriod} onValueChange={setBudgetPeriod}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" onClick={() => setIsAddBudgetOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Budget
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredBudgets.length > 0 ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Overall Budget</h3>
                    <div className="text-sm text-muted-foreground">
                      ${totalSpent.toFixed(2)} / ${totalBudgeted.toFixed(2)}
                    </div>
                  </div>
                  <Progress
                    value={totalPercentage}
                    className={totalPercentage > 90 ? 'text-red-500' : ''}
                  />
                  <p className="text-xs text-right text-muted-foreground">
                    {totalPercentage}% used
                  </p>
                </div>

                {filteredBudgets.map((budget) => {
                  const percentage = Math.min(
                    Math.round((budget.spent / budget.budgeted) * 100),
                    100,
                  )
                  const isOverBudget = budget.spent > budget.budgeted

                  return (
                    <div key={budget.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium">
                            {budget.category}
                          </h3>
                          {isOverBudget && (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-muted-foreground">
                            ${budget.spent.toFixed(2)} / $
                            {budget.budgeted.toFixed(2)}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => setEditingBudget(budget)}
                          >
                            <span className="sr-only">Edit</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-pencil"
                            >
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                              <path d="m15 5 4 4" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                      <Progress
                        value={percentage}
                        className={isOverBudget ? 'bg-red-200' : ''}
                        // indicatorClassName={isOverBudget ? 'bg-red-500' : ''}
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {isOverBudget
                            ? `${percentage - 100}% over budget`
                            : `${percentage}% used`}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 text-xs text-muted-foreground hover:text-red-500"
                          onClick={() => setDeletingBudget(budget.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                <h3 className="mt-4 text-sm font-medium">
                  No {budgetPeriod} budgets
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You don't have any {budgetPeriod} budgets set up yet.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => setIsAddBudgetOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add your first budget
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsAddBudgetOpen(true)}
          >
            Add New Budget
          </Button>
        </CardFooter>
      </Card>

      <AddBudgetDialog
        open={isAddBudgetOpen}
        onOpenChange={setIsAddBudgetOpen}
        onAddBudget={handleAddBudget}
      />

      {editingBudget && (
        <EditBudgetDialog
          open={!!editingBudget}
          budget={editingBudget}
          onOpenChange={() => setEditingBudget(null)}
          onUpdateBudget={handleUpdateBudget}
        />
      )}

      {deletingBudget !== null && (
        <AlertDialog open={true} onOpenChange={() => setDeletingBudget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Budget</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this budget? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteBudget(deletingBudget)}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
