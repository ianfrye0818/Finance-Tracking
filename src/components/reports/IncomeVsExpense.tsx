import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

// Mock data for income vs expenses for each month
const monthlyData = [
  { month: 'Jan', income: 3000, expenses: 2500 },
  { month: 'Feb', income: 3200, expenses: 2600 },
  { month: 'Mar', income: 3100, expenses: 2800 },
  { month: 'Apr', income: 3300, expenses: 2700 },
  { month: 'May', income: 3250, expenses: 2900 },
  { month: 'Jun', income: 3500, expenses: 2850 },
]

export function IncomeVsExpenses() {
  const [period, setPeriod] = useState('6months')

  // Calculate the maximum value for proper chart scaling
  const maxValue =
    Math.max(...monthlyData.map((d) => Math.max(d.income, d.expenses))) * 1.1

  // Calculate totals and savings
  const totalIncome = monthlyData.reduce((sum, month) => sum + month.income, 0)
  const totalExpenses = monthlyData.reduce(
    (sum, month) => sum + month.expenses,
    0,
  )
  const savings = totalIncome - totalExpenses
  const savingsRate = (savings / totalIncome) * 100

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Income vs Expenses</CardTitle>
          <CardDescription>Compare your income and expenses</CardDescription>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="h-8 w-[120px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">3 Months</SelectItem>
            <SelectItem value="6months">6 Months</SelectItem>
            <SelectItem value="year">1 Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex h-[200px] w-full flex-col">
          <div className="relative flex h-[160px] items-end">
            {monthlyData.map((data, index) => (
              <div key={index} className="group relative flex flex-1 gap-1">
                <div className="relative flex h-full w-full flex-col items-center justify-end">
                  <div
                    className="w-4 rounded-t-md bg-green-500 transition-all group-hover:opacity-80"
                    style={{
                      height: `${(data.income / maxValue) * 100}%`,
                    }}
                  />
                </div>
                <div className="relative flex h-full w-full flex-col items-center justify-end">
                  <div
                    className="w-4 rounded-t-md bg-red-400 transition-all group-hover:opacity-80"
                    style={{
                      height: `${(data.expenses / maxValue) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-xs text-muted-foreground">
              <span>${maxValue}</span>
              <span>${maxValue / 2}</span>
              <span>$0</span>
            </div>
          </div>
          <div className="mt-2 flex justify-around">
            {monthlyData.map((data, index) => (
              <div key={index} className="text-xs text-muted-foreground">
                {data.month}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Income</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-red-400"></div>
            <span className="text-xs">Expenses</span>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1 text-center">
            <p className="text-xs text-muted-foreground">Total Income</p>
            <p className="text-lg font-medium text-green-500">${totalIncome}</p>
          </div>
          <div className="space-y-1 text-center">
            <p className="text-xs text-muted-foreground">Total Expenses</p>
            <p className="text-lg font-medium text-red-500">${totalExpenses}</p>
          </div>
          <div className="space-y-1 text-center">
            <p className="text-xs text-muted-foreground">Savings Rate</p>
            <p className="text-lg font-medium">{savingsRate.toFixed(1)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
