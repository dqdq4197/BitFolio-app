import EmailVerification from '/components/auth/EmailVerification'
import AsyncBoundary from '/components/common/AsyncBoundary'

const EmailVerificationScreen = () => {
  return (
    <AsyncBoundary>
      <EmailVerification />
    </AsyncBoundary>
  )
}

export default EmailVerificationScreen
