import { ArrowUpIcon, BarChart3Icon, DollarSign, LineChart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

export function ReportsOverview() {
  const [period, setPeriod] = useState('month')

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="h-8 w-[90px] text-xs">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">$3,245.00</div>
            <Badge
              variant="outline"
              className="flex items-center gap-1 text-green-500"
            >
              <ArrowUpIcon className="h-3 w-3" />
              12%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {period === 'week'
              ? 'From last week'
              : period === 'month'
                ? 'From last month'
                : 'From last year'}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">$2,875.00</div>
            <Badge
              variant="outline"
              className="flex items-center gap-1 text-red-500"
            >
              <ArrowUpIcon className="h-3 w-3" />
              8%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {period === 'week'
              ? 'From last week'
              : period === 'month'
                ? 'From last month'
                : 'From last year'}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
          <LineChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">11.4%</div>
            <Badge
              variant="outline"
              className="flex items-center gap-1 text-green-500"
            >
              <ArrowUpIcon className="h-3 w-3" />
              3%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">Of total income</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
          <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">$28,450.00</div>
            <Badge
              variant="outline"
              className="flex items-center gap-1 text-green-500"
            >
              <ArrowUpIcon className="h-3 w-3" />
              18%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {period === 'week'
              ? 'From last week'
              : period === 'month'
                ? 'From last month'
                : 'From last year'}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
