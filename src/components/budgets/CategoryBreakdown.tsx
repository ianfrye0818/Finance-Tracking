'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface CategoryBreakdownProps {
  className?: string
}

// Mock data for the category breakdown
const monthlyCategoryData = [
  { category: 'Housing', budgeted: 1200, spent: 1200, percentage: 30 },
  { category: 'Food', budgeted: 500, spent: 320, percentage: 15 },
  { category: 'Transportation', budgeted: 300, spent: 275, percentage: 12 },
  { category: 'Utilities', budgeted: 250, spent: 220, percentage: 10 },
  { category: 'Entertainment', budgeted: 200, spent: 150, percentage: 7 },
  { category: 'Personal', budgeted: 150, spent: 130, percentage: 6 },
  { category: 'Health', budgeted: 100, spent: 50, percentage: 5 },
  { category: 'Other', budgeted: 300, spent: 180, percentage: 15 },
]

const weeklyCategoryData = [
  { category: 'Groceries', budgeted: 100, spent: 85, percentage: 40 },
  { category: 'Eating Out', budgeted: 50, spent: 65, percentage: 20 },
  { category: 'Coffee', budgeted: 25, spent: 30, percentage: 10 },
  { category: 'Entertainment', budgeted: 40, spent: 20, percentage: 15 },
  { category: 'Gas', budgeted: 30, spent: 25, percentage: 10 },
  { category: 'Other', budgeted: 15, spent: 10, percentage: 5 },
]

export function CategoryBreakdown({ className }: CategoryBreakdownProps) {
  const [activeTab, setActiveTab] = useState('monthly')

  const data =
    activeTab === 'monthly' ? monthlyCategoryData : weeklyCategoryData

  // Calculate totals
  const totalBudgeted = data.reduce(
    (sum, category) => sum + category.budgeted,
    0,
  )
  const totalSpent = data.reduce((sum, category) => sum + category.spent, 0)

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>
          See how your spending breaks down by category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="space-y-4">
            <div className="space-y-4">
              <div className="h-[200px] w-full flex items-center justify-center relative">
                <div className="flex h-[200px] w-[200px] items-center justify-center">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f0f0f0"
                      strokeWidth="20"
                    />
                    {data.map((category, index) => {
                      // Calculate the segment position for the pie chart
                      const prevPercentages = data
                        .slice(0, index)
                        .reduce((sum, cat) => sum + cat.percentage, 0)
                      const offset = 100 - prevPercentages
                      const strokeDasharray = `${category.percentage} ${100 - category.percentage}`

                      // Generate a color based on index
                      const hue = (index * 30) % 360
                      const color = `hsl(${hue}, 70%, 60%)`

                      return (
                        <circle
                          key={category.category}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={color}
                          strokeWidth="20"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={-offset}
                          transform="rotate(-90 50 50)"
                        />
                      )
                    })}
                  </svg>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="text-2xl font-bold">
                    ${totalSpent.toFixed(0)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    of ${totalBudgeted.toFixed(0)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {data.map((category, index) => {
                  // Generate the same color as in the pie chart
                  const hue = (index * 30) % 360
                  const color = `hsl(${hue}, 70%, 60%)`

                  return (
                    <div
                      key={category.category}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: color }}
                        ></div>
                        <span className="text-sm">{category.category}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground">
                          ${category.spent.toFixed(0)} of $
                          {category.budgeted.toFixed(0)}
                        </span>
                        <span className="w-10 text-right text-xs font-medium">
                          {category.percentage}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="weekly" className="space-y-4">
            <div className="space-y-4">
              <div className="h-[200px] w-full flex items-center justify-center relative">
                <div className="flex h-[200px] w-[200px] items-center justify-center">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f0f0f0"
                      strokeWidth="20"
                    />
                    {data.map((category, index) => {
                      // Calculate the segment position for the pie chart
                      const prevPercentages = data
                        .slice(0, index)
                        .reduce((sum, cat) => sum + cat.percentage, 0)
                      const offset = 100 - prevPercentages
                      const strokeDasharray = `${category.percentage} ${100 - category.percentage}`

                      // Generate a color based on index
                      const hue = (index * 50) % 360
                      const color = `hsl(${hue}, 70%, 60%)`

                      return (
                        <circle
                          key={category.category}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={color}
                          strokeWidth="20"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={-offset}
                          transform="rotate(-90 50 50)"
                        />
                      )
                    })}
                  </svg>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="text-2xl font-bold">
                    ${totalSpent.toFixed(0)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    of ${totalBudgeted.toFixed(0)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {data.map((category, index) => {
                  // Generate the same color as in the pie chart
                  const hue = (index * 50) % 360
                  const color = `hsl(${hue}, 70%, 60%)`

                  return (
                    <div
                      key={category.category}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: color }}
                        ></div>
                        <span className="text-sm">{category.category}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground">
                          ${category.spent.toFixed(0)} of $
                          {category.budgeted.toFixed(0)}
                        </span>
                        <span className="w-10 text-right text-xs font-medium">
                          {category.percentage}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
