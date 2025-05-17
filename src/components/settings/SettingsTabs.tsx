import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { AccountSettings } from './AccountSettings'
import { AppearanceSettings } from './ApperanceSettings'
import { CategorySettings } from './CategorySettings'
import { DataSettings } from './DataSettings'
import { ProfileSettings } from './ProfileSettings'
import { NotificationSettings } from './NotificationSettings'

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <Tabs
      defaultValue="profile"
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-4"
    >
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="accounts">Accounts</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="data">Data</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <ProfileSettings />
        </Card>
      </TabsContent>
      <TabsContent value="accounts">
        <Card>
          <AccountSettings />
        </Card>
      </TabsContent>
      <TabsContent value="appearance">
        <Card>
          <AppearanceSettings />
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <NotificationSettings />
        </Card>
      </TabsContent>
      <TabsContent value="data">
        <Card>
          <DataSettings />
        </Card>
      </TabsContent>
      <TabsContent value="categories">
        <Card>
          <CategorySettings />
        </Card>
      </TabsContent>
    </Tabs>
  )
}
