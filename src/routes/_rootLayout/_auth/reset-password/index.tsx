import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import {zodValidator} from '@tanstack/zod-adapter'

const searchSchema = z.object({
  code: z.string()
})

export const Route = createFileRoute('/_rootLayout/_auth/reset-password/')({
  validateSearch: zodValidator(searchSchema),
  beforeLoad: ({search}) => {
    if (!search.code) {
      throw redirect({to: '/login'})
    }
  },
  component: ResetPasswordPage,
})



export default function ResetPasswordPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Reset password</h1>
        <p className="text-sm text-muted-foreground">Create a new password for your account</p>
      </div>
      <ResetPasswordForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link to="/login" className="hover:text-brand underline underline-offset-4">
          Back to login
        </Link>
      </p>
    </div>
  )
}
