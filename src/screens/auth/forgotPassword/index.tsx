import ForgotPassword from '/components/auth/ForgotPassword'
import AsyncBoundary from '/components/common/AsyncBoundary'

const ForgotPasswordScreen = () => {
  return (
    <AsyncBoundary skeleton={<></>}>
      <ForgotPassword />
    </AsyncBoundary>
  )
}

export default ForgotPasswordScreen
