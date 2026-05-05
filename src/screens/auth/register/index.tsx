import Register from '@/components/auth/register'
import AsyncBoundary from '@/components/common/async-boundary'

const RegisterScreen = () => {
  return (
    <AsyncBoundary skeleton={<></>}>
      <Register />
    </AsyncBoundary>
  )
}

export default RegisterScreen
