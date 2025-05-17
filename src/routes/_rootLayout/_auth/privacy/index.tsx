import { Button } from '@/components/ui/button'
import { createFileRoute, useRouter} from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

export const Route = createFileRoute('/_rootLayout/_auth/privacy/')({
  component: PrivacyPage,
})


export default function PrivacyPage() {
  const router = useRouter();
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
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: May 17, 2025</p>
        </div>

        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">1. Introduction</h2>
            <p>
              At Finance Tracker, we respect your privacy and are committed to protecting your personal data. This
              Privacy Policy explains how we collect, use, and safeguard your information when you use our application.
            </p>
            <p>
              Please read this Privacy Policy carefully. By using Finance Tracker, you consent to the practices
              described in this policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">2. Information We Collect</h2>
            <p>We collect several types of information from and about users of our application, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">Personal Information:</span> Such as your name, email address, and other
                identifiers you provide when registering for an account.
              </li>
              <li>
                <span className="font-medium">Financial Information:</span> Information about your accounts,
                transactions, budgets, and other financial data you input into the application.
              </li>
              <li>
                <span className="font-medium">Usage Data:</span> Information about how you use our application,
                including your interactions with features and content.
              </li>
              <li>
                <span className="font-medium">Device Information:</span> Information about your device, browser, IP
                address, and other technical details.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">3. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To personalize your experience</li>
              <li>To improve our application</li>
              <li>To communicate with you</li>
              <li>To provide customer support</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction. These measures include encryption, secure servers, and regular
              security assessments.
            </p>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive
              to use commercially acceptable means to protect your personal information, we cannot guarantee its
              absolute security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">5. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our application and store certain
              information. Cookies are files with a small amount of data that may include an anonymous unique
              identifier.
            </p>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
              if you do not accept cookies, you may not be able to use some portions of our application.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">6. Third-Party Services</h2>
            <p>
              Our application may contain links to third-party websites or services that are not owned or controlled by
              Finance Tracker. We have no control over and assume no responsibility for the content, privacy policies,
              or practices of any third-party websites or services.
            </p>
            <p>
              We may use third-party service providers to help us operate our application or administer activities on
              our behalf. We may share your information with these third parties only to the extent necessary for them
              to provide these services to us.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">7. Your Data Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access the personal information we have about you</li>
              <li>The right to request correction of inaccurate information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the information provided in the "Contact Us"
              section.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">8. Children's Privacy</h2>
            <p>
              Our application is not intended for use by children under the age of 13. We do not knowingly collect
              personal information from children under 13. If you are a parent or guardian and you are aware that your
              child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
              are effective when they are posted on this page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="font-medium">privacy@financetracker.example.com</p>
          </section>
        </div>
      </div>
    </div>
  )
}
