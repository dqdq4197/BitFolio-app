import ChangePassword from '@/components/auth/ChangePassword'
import AsyncBoundary from '@/components/common/AsyncBoundary'

const ChangePasswordScreen = () => {
  return (
    <AsyncBoundary skeleton={<></>}>
      <ChangePassword />
    </AsyncBoundary>
  )
}

export default ChangePasswordScreen
