import EmailVerification from '@/components/auth/email-verification'
import AsyncBoundary from '@/components/common/async-boundary'

const EmailVerificationScreen = () => {
  return (
    <AsyncBoundary>
      <EmailVerification />
    </AsyncBoundary>
  )
}

export default EmailVerificationScreen
