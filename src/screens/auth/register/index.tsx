import Register from '@/components/auth/Register'
import AsyncBoundary from '@/components/common/AsyncBoundary'

const RegisterScreen = () => {
  return (
    <AsyncBoundary skeleton={<></>}>
      <Register />
    </AsyncBoundary>
  )
}

export default RegisterScreen
