import { Button } from '@/components/ui/button'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

export const Route = createFileRoute('/_rootLayout/_auth/terms/')({
  component: TermsPage,
})


export default function TermsPage() {
  const router = useRouter()
  return (
    <div className="container max-w-3xl py-6 lg:py-10">
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => router.history.back()}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
      </div>

      <div className="mt-4 space-y-8">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-muted-foreground mt-2">Last updated: May 17, 2025</p>
        </div>

        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">1. Introduction</h2>
            <p>
              Welcome to Finance Tracker. These Terms of Service govern your use of our website and application. By
              accessing or using Finance Tracker, you agree to be bound by these Terms.
            </p>
            <p>
              Please read these Terms carefully before using our services. If you do not agree with any part of these
              Terms, you may not use our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">2. Account Registration</h2>
            <p>
              To use certain features of Finance Tracker, you must register for an account. You agree to provide
              accurate, current, and complete information during the registration process and to update such information
              to keep it accurate, current, and complete.
            </p>
            <p>
              You are responsible for safeguarding your password and for all activities that occur under your account.
              You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">3. Acceptable Use</h2>
            <p>
              You agree not to use Finance Tracker for any purpose that is illegal or prohibited by these Terms. You may
              not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the service for any illegal purpose or in violation of any laws</li>
              <li>Violate or infringe other people's intellectual property, privacy, or other rights</li>
              <li>Interfere with or disrupt the service or servers or networks connected to the service</li>
              <li>Attempt to gain unauthorized access to any part of the service</li>
              <li>Use the service to transmit any viruses, worms, or other malicious code</li>
              <li>Collect or harvest any information from the service, including account names</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">4. Intellectual Property</h2>
            <p>
              Finance Tracker and its original content, features, and functionality are owned by Finance Tracker and are
              protected by international copyright, trademark, patent, trade secret, and other intellectual property or
              proprietary rights laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">5. User Data</h2>
            <p>
              You retain all rights to your data. By using Finance Tracker, you grant us a license to use, store, and
              process your data solely for the purpose of providing and improving our services.
            </p>
            <p>
              We take the security of your data seriously and implement reasonable measures to protect it. However, no
              method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">6. Termination</h2>
            <p>
              We may terminate or suspend your account and access to Finance Tracker immediately, without prior notice
              or liability, for any reason, including, without limitation, if you breach these Terms.
            </p>
            <p>
              Upon termination, your right to use Finance Tracker will immediately cease. If you wish to terminate your
              account, you may simply discontinue using the service or contact us to request account deletion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">7. Limitation of Liability</h2>
            <p>
              In no event shall Finance Tracker, its directors, employees, partners, agents, suppliers, or affiliates be
              liable for any indirect, incidental, special, consequential, or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
              provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change
              will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our service after any revisions become effective, you agree to be bound by
              the revised terms. If you do not agree to the new terms, you are no longer authorized to use the service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">9. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p className="font-medium">support@financetracker.example.com</p>
          </section>
        </div>
      </div>
    </div>
  )
}
