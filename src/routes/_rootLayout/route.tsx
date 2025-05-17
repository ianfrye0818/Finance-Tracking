import { MainNav } from '@/components/MainNav'
import { ThemeProvider } from '@/components/ThemeProvider'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout')({
  component: RootLayout,
})

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="Vite_Theme">
      <div className="flex min-h-screen flex-col container mx-auto">
        <MainNav />
        <div className="flex-1 p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  )
}
