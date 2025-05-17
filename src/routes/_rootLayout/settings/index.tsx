import { DashboardHeader } from '@/components/DashboardHeader'
import { DashboardShell } from '@/components/DashboardShell'
import { SettingsTabs } from '@/components/settings/SettingsTabs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/settings/')({
  component: SettingsPage,
})

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage your account settings and preferences."
      />
      <SettingsTabs />
    </DashboardShell>
  )
}
