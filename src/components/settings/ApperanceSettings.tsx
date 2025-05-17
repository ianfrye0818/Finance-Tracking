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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Loader2, Moon, Sun } from 'lucide-react'
import { useTheme } from '../ThemeProvider'

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    dateFormat: 'MM/DD/YYYY',
    numberFormat: '1,234.56',
    colorScheme: 'default',
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
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how the application looks and displays information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Theme</h3>
          <div className="grid grid-cols-3 gap-4">
            <div
              className={`flex cursor-pointer flex-col items-center justify-center rounded-md border p-4 ${
                theme === 'light' ? 'border-primary bg-primary/10' : ''
              }`}
              onClick={() => setTheme('light')}
            >
              <Sun className="mb-2 h-6 w-6" />
              <span className="text-sm font-medium">Light</span>
            </div>
            <div
              className={`flex cursor-pointer flex-col items-center justify-center rounded-md border p-4 ${
                theme === 'dark' ? 'border-primary bg-primary/10' : ''
              }`}
              onClick={() => setTheme('dark')}
            >
              <Moon className="mb-2 h-6 w-6" />
              <span className="text-sm font-medium">Dark</span>
            </div>
            <div
              className={`flex cursor-pointer flex-col items-center justify-center rounded-md border p-4 ${
                theme === 'system' ? 'border-primary bg-primary/10' : ''
              }`}
              onClick={() => setTheme('system')}
            >
              <div className="mb-2 flex h-6 w-6">
                <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </div>
              <span className="text-sm font-medium">System</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Color Scheme</h3>
          <RadioGroup
            value={settings.colorScheme}
            onValueChange={(value) =>
              setSettings({ ...settings, colorScheme: value })
            }
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            <div>
              <RadioGroupItem
                value="default"
                id="default"
                className="peer sr-only"
              />
              <Label
                htmlFor="default"
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="mb-2 h-4 w-4 rounded-full bg-primary"></span>
                <span className="text-sm font-medium">Default</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="blue" id="blue" className="peer sr-only" />
              <Label
                htmlFor="blue"
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
              >
                <span className="mb-2 h-4 w-4 rounded-full bg-blue-600"></span>
                <span className="text-sm font-medium">Blue</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="green"
                id="green"
                className="peer sr-only"
              />
              <Label
                htmlFor="green"
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-600 [&:has([data-state=checked])]:border-green-600"
              >
                <span className="mb-2 h-4 w-4 rounded-full bg-green-600"></span>
                <span className="text-sm font-medium">Green</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="purple"
                id="purple"
                className="peer sr-only"
              />
              <Label
                htmlFor="purple"
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple-600 [&:has([data-state=checked])]:border-purple-600"
              >
                <span className="mb-2 h-4 w-4 rounded-full bg-purple-600"></span>
                <span className="text-sm font-medium">Purple</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Format Settings</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="date-format">Date Format</Label>
              <Select
                value={settings.dateFormat}
                onValueChange={(value) =>
                  setSettings({ ...settings, dateFormat: value })
                }
              >
                <SelectTrigger id="date-format">
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  <SelectItem value="MMM D, YYYY">MMM D, YYYY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="number-format">Number Format</Label>
              <Select
                value={settings.numberFormat}
                onValueChange={(value) =>
                  setSettings({ ...settings, numberFormat: value })
                }
              >
                <SelectTrigger id="number-format">
                  <SelectValue placeholder="Select number format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1,234.56">1,234.56 (US)</SelectItem>
                  <SelectItem value="1.234,56">1.234,56 (EU)</SelectItem>
                  <SelectItem value="1 234.56">1 234.56 (Space)</SelectItem>
                  <SelectItem value="1234.56">
                    1234.56 (No separator)
                  </SelectItem>
                </SelectContent>
              </Select>
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
