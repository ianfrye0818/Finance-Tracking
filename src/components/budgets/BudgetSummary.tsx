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
import { Progress } from '@/components/ui/progress'
import { AddBudgetDialog } from './AddBudgetDialog'

export function BudgetSummary() {
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false)
  const [budgets, setBudgets] = useState([
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
  ])

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Budget Summary</CardTitle>
          <CardDescription>Track your spending against budgets</CardDescription>
        </div>
        <Button size="sm" onClick={() => setIsAddBudgetOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Budget
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = Math.min(
              Math.round((budget.spent / budget.budgeted) * 100),
              100,
            )
            return (
              <div key={budget.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {budget.category}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {budget.period}
                    </p>
                  </div>
                  <div className="text-sm">
                    ${budget.spent.toFixed(2)} / ${budget.budgeted.toFixed(2)}
                  </div>
                </div>
                <Progress
                  value={percentage}
                  className={percentage > 90 ? 'text-red-500' : ''}
                />
                <p className="text-xs text-right text-muted-foreground">
                  {percentage}% used
                </p>
              </div>
            )
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsAddBudgetOpen(true)}
        >
          View All Budgets
        </Button>
      </CardFooter>
      <AddBudgetDialog
        open={isAddBudgetOpen}
        onOpenChange={setIsAddBudgetOpen}
        onAddBudget={(budget) => {
          setBudgets([...budgets, { ...budget, id: budgets.length + 1 }])
        }}
      />
    </Card>
  )
}
