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
import { useState } from 'react'

// Mock data for the expenses by category
const expenseData = [
  { category: 'Housing', amount: 1200, color: 'hsl(340, 70%, 60%)' },
  { category: 'Food', amount: 450, color: 'hsl(20, 70%, 60%)' },
  { category: 'Transportation', amount: 280, color: 'hsl(60, 70%, 60%)' },
  { category: 'Utilities', amount: 220, color: 'hsl(120, 70%, 60%)' },
  { category: 'Entertainment', amount: 150, color: 'hsl(200, 70%, 60%)' },
  { category: 'Other', amount: 280, color: 'hsl(260, 70%, 60%)' },
]

export function ExpensesByCategory() {
  const [period, setPeriod] = useState('month')

  const totalExpenses = expenseData.reduce(
    (sum, category) => sum + category.amount,
    0,
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Expenses by Category</CardTitle>
          <CardDescription>See where your money is going</CardDescription>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="h-8 w-[120px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="aspect-square h-[200px] w-[200px] mx-auto relative">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              {expenseData.map((category, index) => {
                const percentage = (category.amount / totalExpenses) * 100
                const previousPercentages = expenseData
                  .slice(0, index)
                  .reduce(
                    (sum, cat) => sum + (cat.amount / totalExpenses) * 100,
                    0,
                  )

                // Calculate start and end angles for the pie slice
                const startAngle = (previousPercentages / 100) * 360 - 90
                const endAngle =
                  ((previousPercentages + percentage) / 100) * 360 - 90

                // Convert angles to radians
                const startRad = (startAngle * Math.PI) / 180
                const endRad = (endAngle * Math.PI) / 180

                // Calculate the SVG path
                const x1 = 50 + 40 * Math.cos(startRad)
                const y1 = 50 + 40 * Math.sin(startRad)
                const x2 = 50 + 40 * Math.cos(endRad)
                const y2 = 50 + 40 * Math.sin(endRad)

                // Determine if the arc should be drawn as a large arc (1) or small arc (0)
                const largeArcFlag = percentage > 50 ? 1 : 0

                const pathData = `
                  M 50 50
                  L ${x1} ${y1}
                  A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
                  Z
                `

                return (
                  <path
                    key={category.category}
                    d={pathData}
                    fill={category.color}
                    stroke="white"
                    strokeWidth="1"
                  />
                )
              })}
            </svg>
          </div>
          <div className="space-y-2">
            {expenseData.map((category) => (
              <div
                key={category.category}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm">{category.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">
                    ${category.amount}
                  </span>
                  <span className="w-12 text-right text-xs text-muted-foreground">
                    {Math.round((category.amount / totalExpenses) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
