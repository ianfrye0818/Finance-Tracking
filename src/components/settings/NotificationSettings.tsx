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
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Loader2 } from 'lucide-react'

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    budgetAlerts: true,
    budgetAlertThreshold: '90',
    billReminders: true,
    billReminderDays: '3',
    weeklyReports: true,
    monthlyReports: true,
    lowBalanceAlerts: true,
    lowBalanceThreshold: '100',
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
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Configure how and when you receive notifications and alerts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notification Channels</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, emailNotifications: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications on your device
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, pushNotifications: checked })
                }
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Budget Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="budget-alerts">Budget Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts when you approach your budget limits
                </p>
              </div>
              <Switch
                id="budget-alerts"
                checked={settings.budgetAlerts}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, budgetAlerts: checked })
                }
              />
            </div>
            {settings.budgetAlerts && (
              <div className="grid gap-2">
                <Label htmlFor="budget-alert-threshold">
                  Alert Threshold (%)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="budget-alert-threshold"
                    type="number"
                    min="1"
                    max="100"
                    value={settings.budgetAlertThreshold}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        budgetAlertThreshold: e.target.value,
                      })
                    }
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">
                    % of budget
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  You will be alerted when you reach{' '}
                  {settings.budgetAlertThreshold}% of your budget
                </p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Bill Reminders</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="bill-reminders">Bill Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Receive reminders for upcoming bills
                </p>
              </div>
              <Switch
                id="bill-reminders"
                checked={settings.billReminders}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, billReminders: checked })
                }
              />
            </div>
            {settings.billReminders && (
              <div className="grid gap-2">
                <Label htmlFor="bill-reminder-days">
                  Reminder Days Before Due
                </Label>
                <Select
                  value={settings.billReminderDays}
                  onValueChange={(value) =>
                    setSettings({ ...settings, billReminderDays: value })
                  }
                >
                  <SelectTrigger id="bill-reminder-days" className="w-40">
                    <SelectValue placeholder="Select days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day before</SelectItem>
                    <SelectItem value="2">2 days before</SelectItem>
                    <SelectItem value="3">3 days before</SelectItem>
                    <SelectItem value="5">5 days before</SelectItem>
                    <SelectItem value="7">7 days before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Reports & Summaries</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-reports">Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Receive weekly financial summaries
                </p>
              </div>
              <Switch
                id="weekly-reports"
                checked={settings.weeklyReports}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, weeklyReports: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="monthly-reports">Monthly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Receive monthly financial summaries
                </p>
              </div>
              <Switch
                id="monthly-reports"
                checked={settings.monthlyReports}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, monthlyReports: checked })
                }
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Account Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="low-balance-alerts">Low Balance Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts when your account balance falls below a
                  threshold
                </p>
              </div>
              <Switch
                id="low-balance-alerts"
                checked={settings.lowBalanceAlerts}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, lowBalanceAlerts: checked })
                }
              />
            </div>
            {settings.lowBalanceAlerts && (
              <div className="grid gap-2">
                <Label htmlFor="low-balance-threshold">
                  Low Balance Threshold
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <Input
                    id="low-balance-threshold"
                    type="number"
                    min="0"
                    value={settings.lowBalanceThreshold}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        lowBalanceThreshold: e.target.value,
                      })
                    }
                    className="w-24"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  You will be alerted when your account balance falls below $
                  {settings.lowBalanceThreshold}
                </p>
              </div>
            )}
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
