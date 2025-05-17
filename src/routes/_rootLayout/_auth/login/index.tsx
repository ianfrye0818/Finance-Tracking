import { LoginForm } from '@/components/auth/LoginForm'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/_auth/login/')({
  component: LoginPage,
})



export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Enter your credentials below to access your account</p>
      </div>
      <LoginForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link to="/forgot-password" className="hover:text-brand underline underline-offset-4">
          Forgot your password?
        </Link>
      </p>
      <p className="px-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="hover:text-brand underline underline-offset-4">
          Sign up
        </Link>
      </p>
    </div>
  )
}
