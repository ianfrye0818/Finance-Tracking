import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
