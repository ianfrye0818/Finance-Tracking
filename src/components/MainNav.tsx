import { cn } from '@/lib/utils'
import { Link, useLocation } from '@tanstack/react-router'
import {
  BarChart3,
  CreditCard,
  DollarSign,
  Download,
  Home,
  PieChart,
  Settings,
  Wallet,
} from 'lucide-react'
import { Button } from './ui/button'
import { ModeToggle } from './ModeToggle'

export function MainNav() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/dashboard" className="mr-6 flex items-center space-x-2">
            <Wallet className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              FinanceTracker
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/dashboard"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === '/dashboard'
                  ? 'text-foreground'
                  : 'text-foreground/60',
              )}
            >
              <div className="flex items-center gap-x-2">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link
              to="/transactions"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname?.startsWith('/transactions')
                  ? 'text-foreground'
                  : 'text-foreground/60',
              )}
            >
              <div className="flex items-center gap-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Transactions</span>
              </div>
            </Link>
            <Link
              to="/accounts"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname?.startsWith('/accounts')
                  ? 'text-foreground'
                  : 'text-foreground/60',
              )}
            >
              <div className="flex items-center gap-x-2">
                <CreditCard className="h-4 w-4" />
                <span>Accounts</span>
              </div>
            </Link>
            <Link
              to="/budgets"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname?.startsWith('/budgets')
                  ? 'text-foreground'
                  : 'text-foreground/60',
              )}
            >
              <div className="flex items-center gap-x-2">
                <PieChart className="h-4 w-4" />
                <span>Budgets</span>
              </div>
            </Link>
            <Link
              to="/reports"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname?.startsWith('/reports')
                  ? 'text-foreground'
                  : 'text-foreground/60',
              )}
            >
              <div className="flex items-center gap-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Reports</span>
              </div>
            </Link>
            <Link
              to="/import"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname?.startsWith('/import')
                  ? 'text-foreground'
                  : 'text-foreground/60',
              )}
            >
              <div className="flex items-center gap-x-2">
                <Download className="h-4 w-4" />
                <span>Import</span>
              </div>
            </Link>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
