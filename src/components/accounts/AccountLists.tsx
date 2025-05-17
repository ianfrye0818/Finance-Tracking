'use client'

import { useState, useEffect } from 'react'
import {
  ChevronRight,
  CreditCard,
  DollarSign,
  Plus,
  Wallet,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { AddAccountDialog } from './AddAccountDialog'
import { EditAccountDialog } from './EditAccountDialog'
import { DeleteAccountDialog } from './DeleteAccountDialog'

interface Account {
  id: number
  name: string
  balance: number
  type: string
  notes?: string
  isActive?: boolean
}

interface AccountsListProps {
  className?: string
}

export function AccountsList({ className }: AccountsListProps) {
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [deletingAccount, setDeletingAccount] = useState<number | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null)

  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: 1,
      name: 'Checking Account',
      balance: 2543.87,
      type: 'checking',
      isActive: true,
    },
    { id: 2, name: 'Savings Account', balance: 12750.52, type: 'savings' },
    { id: 3, name: 'Credit Card', balance: -450.33, type: 'credit' },
    {
      id: 4,
      name: 'Investment Account',
      balance: 8320.15,
      type: 'investment',
      notes: 'Retirement funds',
    },
    {
      id: 5,
      name: 'Emergency Fund',
      balance: 5000.0,
      type: 'savings',
      notes: 'For emergencies only',
    },
  ])

  // Set first account as selected by default
  useEffect(() => {
    if (accounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0].id)
    }
  }, [accounts, selectedAccount])

  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0,
  )

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return <DollarSign className="h-4 w-4" />
      case 'credit':
        return <CreditCard className="h-4 w-4" />
      default:
        return <Wallet className="h-4 w-4" />
    }
  }

  const handleAddAccount = (account: Omit<Account, 'id'>) => {
    const newId = Math.max(...accounts.map((a) => a.id), 0) + 1
    const newAccount = { ...account, id: newId }
    setAccounts([...accounts, newAccount])
    setSelectedAccount(newId)
  }

  const handleUpdateAccount = (updatedAccount: Account) => {
    setAccounts(
      accounts.map((a) => (a.id === updatedAccount.id ? updatedAccount : a)),
    )
    setEditingAccount(null)
  }

  const handleDeleteAccount = (id: number) => {
    setAccounts(accounts.filter((a) => a.id !== id))
    if (selectedAccount === id) {
      setSelectedAccount(accounts.length > 1 ? accounts[0].id : null)
    }
    setDeletingAccount(null)
  }

  return (
    <>
      <Card className={cn('relative', className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Accounts</CardTitle>
              <CardDescription>
                Manage all your financial accounts
              </CardDescription>
            </div>
            <Button size="sm" onClick={() => setIsAddAccountOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {accounts.map((account) => (
              <li key={account.id}>
                <button
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-md text-left',
                    selectedAccount === account.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted',
                  )}
                  onClick={() => setSelectedAccount(account.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full',
                        selectedAccount === account.id
                          ? 'bg-primary-foreground text-primary'
                          : 'bg-muted',
                      )}
                    >
                      {getAccountIcon(account.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{account.name}</p>
                        {account.isActive && (
                          <Badge
                            variant={
                              selectedAccount !== account.id
                                ? 'secondary'
                                : 'default'
                            }
                            className="text-xs"
                          >
                            Active
                          </Badge>
                        )}
                      </div>
                      <p
                        className={cn(
                          'text-sm',
                          selectedAccount === account.id
                            ? 'text-primary-foreground/70'
                            : 'text-muted-foreground',
                        )}
                      >
                        {account.type.charAt(0).toUpperCase() +
                          account.type.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'font-bold',
                        selectedAccount === account.id
                          ? 'text-primary-foreground'
                          : account.balance < 0
                            ? 'text-red-500'
                            : '',
                      )}
                    >
                      ${account.balance.toFixed(2)}
                    </span>
                    <ChevronRight
                      className={cn(
                        'h-4 w-4',
                        selectedAccount === account.id
                          ? 'text-primary-foreground'
                          : 'text-muted-foreground',
                      )}
                    />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 border-t px-6 py-4">
          <div className="flex w-full justify-between">
            <p className="text-sm font-medium">Total Balance</p>
            <p
              className={`text-lg font-bold ${totalBalance < 0 ? 'text-red-500' : ''}`}
            >
              ${totalBalance.toFixed(2)}
            </p>
          </div>
          <div className="flex w-full justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setEditingAccount(
                  accounts.find((a) => a.id === selectedAccount) || null,
                )
              }
              disabled={!selectedAccount}
            >
              Edit Account
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 hover:text-red-500"
              onClick={() =>
                selectedAccount && setDeletingAccount(selectedAccount)
              }
              disabled={!selectedAccount}
            >
              Delete Account
            </Button>
          </div>
        </CardFooter>
      </Card>

      <AddAccountDialog
        open={isAddAccountOpen}
        onOpenChange={setIsAddAccountOpen}
        onAddAccount={handleAddAccount}
      />

      {editingAccount && (
        <EditAccountDialog
          open={!!editingAccount}
          account={editingAccount}
          onOpenChange={() => setEditingAccount(null)}
          onUpdateAccount={handleUpdateAccount}
        />
      )}

      {deletingAccount && (
        <DeleteAccountDialog
          open={!!deletingAccount}
          onOpenChange={() => setDeletingAccount(null)}
          onConfirm={() => handleDeleteAccount(deletingAccount)}
        />
      )}
    </>
  )
}
