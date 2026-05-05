import ChangePassword from '@/components/auth/change-password'
import AsyncBoundary from '@/components/common/async-boundary'

const ChangePasswordScreen = () => {
  return (
    <AsyncBoundary skeleton={<></>}>
      <ChangePassword />
    </AsyncBoundary>
  )
}

export default ChangePasswordScreen
