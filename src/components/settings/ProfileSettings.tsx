import { useState } from 'react'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Camera, Loader2 } from 'lucide-react'

export function ProfileSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/placeholder.svg?height=100&width=100',
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
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Manage your personal information and account settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user.avatar || '/placeholder.svg'}
                alt={user.name}
              />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="relative">
              <Button variant="outline" size="sm" className="relative">
                <Camera className="mr-2 h-4 w-4" />
                Change Avatar
                <Input
                  type="file"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  accept="image/*"
                  onChange={(e) => {
                    // Handle file upload
                    const file = e.target.files?.[0]
                    if (file) {
                      // In a real app, you would upload the file to a server
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          setUser({
                            ...user,
                            avatar: event.target.result as string,
                          })
                        }
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                />
              </Button>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Change Password</h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
          <Button variant="outline">Change Password</Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <Button variant="ghost">Cancel</Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </CardFooter>
    </>
  )
}
