import ForgotPassword from '@/components/auth/forgot-password'
import AsyncBoundary from '@/components/common/async-boundary'

const ForgotPasswordScreen = () => {
  return (
    <AsyncBoundary skeleton={<></>}>
      <ForgotPassword />
    </AsyncBoundary>
  )
}

export default ForgotPasswordScreen
