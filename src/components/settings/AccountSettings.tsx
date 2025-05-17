import { useState } from 'react'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Loader2 } from 'lucide-react'

export function AccountSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    defaultCurrency: 'USD',
    defaultAccount: 'Checking Account',
    defaultCategory: 'Uncategorized',
    autoDetectDuplicates: true,
    roundToNearestDollar: false,
    savingsRoundUp: false,
  })

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Configure your account preferences and default settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Default Settings</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="default-currency">Default Currency</Label>
              <Select
                value={settings.defaultCurrency}
                onValueChange={(value) =>
                  setSettings({ ...settings, defaultCurrency: value })
                }
              >
                <SelectTrigger id="default-currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="CAD">CAD ($)</SelectItem>
                  <SelectItem value="AUD">AUD ($)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="default-account">Default Account</Label>
              <Select
                value={settings.defaultAccount}
                onValueChange={(value) =>
                  setSettings({ ...settings, defaultAccount: value })
                }
              >
                <SelectTrigger id="default-account">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Checking Account">
                    Checking Account
                  </SelectItem>
                  <SelectItem value="Savings Account">
                    Savings Account
                  </SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Investment Account">
                    Investment Account
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="default-category">Default Category</Label>
              <Select
                value={settings.defaultCategory}
                onValueChange={(value) =>
                  setSettings({ ...settings, defaultCategory: value })
                }
              >
                <SelectTrigger id="default-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Transaction Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-detect-duplicates">
                  Auto-detect Duplicate Transactions
                </Label>
                <p className="text-sm text-muted-foreground">
                  Automatically detect and flag potential duplicate transactions
                </p>
              </div>
              <Switch
                id="auto-detect-duplicates"
                checked={settings.autoDetectDuplicates}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoDetectDuplicates: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="round-to-nearest-dollar">
                  Round to Nearest Dollar
                </Label>
                <p className="text-sm text-muted-foreground">
                  Display transaction amounts rounded to the nearest dollar
                </p>
              </div>
              <Switch
                id="round-to-nearest-dollar"
                checked={settings.roundToNearestDollar}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, roundToNearestDollar: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="savings-round-up">Savings Round-Up</Label>
                <p className="text-sm text-muted-foreground">
                  Round up transactions to the nearest dollar and transfer the
                  difference to savings
                </p>
              </div>
              <Switch
                id="savings-round-up"
                checked={settings.savingsRoundUp}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, savingsRoundUp: checked })
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <Button variant="ghost">Reset to Defaults</Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </CardFooter>
    </>
  )
}
