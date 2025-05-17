import { SignUpForm } from '@/components/auth/SignUpForm'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/_auth/signup/')({
  component: SignUpPage,
})



export default function SignUpPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">Enter your information below to create your account</p>
      </div>
      <SignUpForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link to="/terms" className="hover:text-brand underline underline-offset-4">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/privacy" className="hover:text-brand underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </p>
      <p className="px-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="hover:text-brand underline underline-offset-4">
          Login
        </Link>
      </p>
    </div>
  )
}
