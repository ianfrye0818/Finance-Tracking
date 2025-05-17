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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'

// Mock data for monthly trends over the year
const monthlyTrends = [
  { month: 'Jan', income: 3000, expenses: 2500, savings: 500 },
  { month: 'Feb', income: 3200, expenses: 2600, savings: 600 },
  { month: 'Mar', income: 3100, expenses: 2800, savings: 300 },
  { month: 'Apr', income: 3300, expenses: 2700, savings: 600 },
  { month: 'May', income: 3250, expenses: 2900, savings: 350 },
  { month: 'Jun', income: 3500, expenses: 2850, savings: 650 },
  { month: 'Jul', income: 3400, expenses: 2750, savings: 650 },
  { month: 'Aug', income: 3450, expenses: 2950, savings: 500 },
  { month: 'Sep', income: 3300, expenses: 2800, savings: 500 },
  { month: 'Oct', income: 3400, expenses: 2900, savings: 500 },
  { month: 'Nov', income: 3500, expenses: 3000, savings: 500 },
  { month: 'Dec', income: 4000, expenses: 3200, savings: 800 },
]

// Mock data for expense categories over time
const expenseTrends = {
  Housing: [
    1200, 1200, 1200, 1250, 1250, 1250, 1250, 1300, 1300, 1300, 1300, 1300,
  ],
  Food: [450, 480, 500, 460, 490, 470, 450, 510, 480, 470, 500, 530],
  Transportation: [280, 260, 300, 270, 290, 280, 270, 260, 250, 270, 290, 300],
  Utilities: [220, 230, 210, 200, 190, 210, 230, 240, 220, 210, 230, 240],
  Entertainment: [150, 130, 180, 160, 190, 170, 150, 160, 180, 170, 190, 210],
  Other: [200, 300, 410, 360, 480, 470, 400, 480, 370, 480, 490, 620],
}

export function MonthlyTrends() {
  const [year, setYear] = useState('2023')
  const [activeTab, setActiveTab] = useState('overview')

  // Calculate the maximum value for proper chart scaling
  const maxIncomeExpense =
    Math.max(...monthlyTrends.map((d) => Math.max(d.income, d.expenses))) * 1.1

  const maxSavings = Math.max(...monthlyTrends.map((d) => d.savings)) * 1.5

  const maxExpenseCategory =
    Math.max(
      ...Object.values(expenseTrends).map((values) => Math.max(...values)),
    ) * 1.1

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Monthly Trends</CardTitle>
          <CardDescription>
            Track your financial trends over time
          </CardDescription>
        </div>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2021">2021</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="h-[300px] w-full">
              <div className="flex h-[260px] w-full items-end">
                {monthlyTrends.map((data, index) => (
                  <div key={index} className="group relative flex flex-1 gap-1">
                    <div className="relative flex h-full w-full flex-col items-center justify-end">
                      <div
                        className="w-2 rounded-t-md bg-green-500 transition-all group-hover:opacity-80"
                        style={{
                          height: `${(data.income / maxIncomeExpense) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="relative flex h-full w-full flex-col items-center justify-end">
                      <div
                        className="w-2 rounded-t-md bg-red-400 transition-all group-hover:opacity-80"
                        style={{
                          height: `${(data.expenses / maxIncomeExpense) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="relative flex h-full w-full flex-col items-center justify-end">
                      <div
                        className="w-2 rounded-t-md bg-blue-400 transition-all group-hover:opacity-80"
                        style={{
                          height: `${(data.savings / maxIncomeExpense) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-around">
                {monthlyTrends.map((data, index) => (
                  <div key={index} className="text-xs text-muted-foreground">
                    {data.month}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Income</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <span className="text-xs">Expenses</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                <span className="text-xs">Savings</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-4">
            <div className="h-[300px] w-full">
              <div className="flex h-[260px] w-full items-end">
                {monthlyTrends.map((data, monthIndex) => (
                  <div key={monthIndex} className="group relative flex flex-1">
                    <div className="relative flex h-full w-full flex-col items-center justify-end">
                      {Object.entries(expenseTrends).map(
                        ([category, values], categoryIndex) => {
                          // Generate a color based on category index
                          const hue = (categoryIndex * 60) % 360
                          const color = `hsl(${hue}, 70%, 60%)`

                          return (
                            <div
                              key={category}
                              className="w-4 transition-all group-hover:opacity-80"
                              style={{
                                height: `${(values[monthIndex] / maxExpenseCategory) * 100}%`,
                                backgroundColor: color,
                              }}
                            ></div>
                          )
                        },
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-around">
                {monthlyTrends.map((data, index) => (
                  <div key={index} className="text-xs text-muted-foreground">
                    {data.month}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {Object.keys(expenseTrends).map((category, index) => {
                // Generate the same color as in the chart
                const hue = (index * 60) % 360
                const color = `hsl(${hue}, 70%, 60%)`

                return (
                  <div key={category} className="flex items-center gap-1">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-xs">{category}</span>
                  </div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="income" className="space-y-4">
            <div className="h-[300px] w-full">
              <div className="flex h-[260px] w-full items-end">
                {monthlyTrends.map((data, index) => (
                  <div key={index} className="group relative flex flex-1">
                    <div className="relative flex h-full w-full flex-col items-center justify-end">
                      <div
                        className="w-6 rounded-t-md bg-green-500 transition-all group-hover:bg-green-400"
                        style={{
                          height: `${(data.income / maxIncomeExpense) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-around">
                {monthlyTrends.map((data, index) => (
                  <div key={index} className="text-xs text-muted-foreground">
                    {data.month}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center text-sm">
              <p>
                Income has been trending
                <span className="font-medium text-green-500"> upward </span>
                with a<span className="font-medium"> 9% </span>
                increase over the year
              </p>
            </div>
          </TabsContent>

          <TabsContent value="savings" className="space-y-4">
            <div className="h-[300px] w-full">
              <div className="flex h-[260px] w-full items-end">
                {monthlyTrends.map((data, index) => (
                  <div key={index} className="group relative flex flex-1">
                    <div className="relative flex h-full w-full flex-col items-center justify-end">
                      <div
                        className="w-6 rounded-t-md bg-blue-500 transition-all group-hover:bg-blue-400"
                        style={{
                          height: `${(data.savings / maxSavings) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-around">
                {monthlyTrends.map((data, index) => (
                  <div key={index} className="text-xs text-muted-foreground">
                    {data.month}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center text-sm">
              <p>
                Your average monthly savings is
                <span className="font-medium">
                  {' '}
                  $
                  {(
                    monthlyTrends.reduce(
                      (sum, month) => sum + month.savings,
                      0,
                    ) / 12
                  ).toFixed(2)}{' '}
                </span>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
