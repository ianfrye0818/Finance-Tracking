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

interface EditBudgetDialogProps {
  open: boolean
  budget: {
    id: number
    category: string
    budgeted: number
    spent: number
    period: string
  }
  onOpenChange: (open: boolean) => void
  onUpdateBudget: (budget: any) => void
}

export function EditBudgetDialog({
  open,
  budget,
  onOpenChange,
  onUpdateBudget,
}: EditBudgetDialogProps) {
  const [category, setCategory] = useState(budget.category)
  const [budgeted, setBudgeted] = useState(budget.budgeted.toString())
  const [spent, setSpent] = useState(budget.spent.toString())
  const [period, setPeriod] = useState(budget.period)

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
    'Groceries',
    'Eating Out',
    'Coffee',
    'Gas',
    'Other',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateBudget({
      id: budget.id,
      category,
      budgeted: Number.parseFloat(budgeted) || 0,
      spent: Number.parseFloat(spent) || 0,
      period,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Budget</DialogTitle>
          <DialogDescription>
            Make changes to your budget settings below.
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
              <Label htmlFor="spent">Amount Spent</Label>
              <Input
                id="spent"
                type="number"
                step="0.01"
                value={spent}
                onChange={(e) => setSpent(e.target.value)}
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
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
