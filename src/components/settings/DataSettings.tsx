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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Download, FileUp, Loader2, RotateCcw } from 'lucide-react'

export function DataSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [settings, setSettings] = useState({
    autoBackup: true,
    backupFrequency: 'weekly',
    dataRetention: '1year',
    anonymousAnalytics: true,
  })

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleExportData = () => {
    // In a real app, this would trigger a data export
    alert('Data export started. You will receive a download link shortly.')
  }

  const handleImportData = () => {
    // In a real app, this would open a file picker
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json,.csv'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        alert(`File selected: ${file.name}. Import would start here.`)
      }
    }
    input.click()
  }

  const handleResetData = () => {
    setShowResetDialog(true)
  }

  const confirmReset = () => {
    // In a real app, this would reset the user's data
    alert('Your data has been reset.')
    setShowResetDialog(false)
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>
          Manage your data, backups, and privacy settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Data Export & Import</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button onClick={handleExportData} className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Export All Data
            </Button>
            <Button
              onClick={handleImportData}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <FileUp className="mr-2 h-4 w-4" />
              Import Data
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Export your data in JSON format for backup or to import into another
            service.
          </p>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Automatic Backups</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-backup">Automatic Backups</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically backup your data
                </p>
              </div>
              <Switch
                id="auto-backup"
                checked={settings.autoBackup}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoBackup: checked })
                }
              />
            </div>
            {settings.autoBackup && (
              <div className="grid gap-2">
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <Select
                  value={settings.backupFrequency}
                  onValueChange={(value) =>
                    setSettings({ ...settings, backupFrequency: value })
                  }
                >
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Data Retention</h3>
          <div className="grid gap-2">
            <Label htmlFor="data-retention">Keep Transaction History For</Label>
            <Select
              value={settings.dataRetention}
              onValueChange={(value) =>
                setSettings({ ...settings, dataRetention: value })
              }
            >
              <SelectTrigger id="data-retention">
                <SelectValue placeholder="Select retention period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
                <SelectItem value="2years">2 Years</SelectItem>
                <SelectItem value="5years">5 Years</SelectItem>
                <SelectItem value="forever">Forever</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Transactions older than this will be automatically archived
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Privacy</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="anonymous-analytics">Anonymous Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Help improve the app by sharing anonymous usage data
              </p>
            </div>
            <Switch
              id="anonymous-analytics"
              checked={settings.anonymousAnalytics}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, anonymousAnalytics: checked })
              }
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Reset Data</h3>
          <Button variant="destructive" onClick={handleResetData}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset All Data
          </Button>
          <p className="text-sm text-muted-foreground">
            This will permanently delete all your data and cannot be undone.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <Button variant="ghost">Cancel</Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </CardFooter>

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all
              your financial data including transactions, accounts, budgets, and
              settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmReset}
              className="bg-red-500 hover:bg-red-600"
            >
              Reset All Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
