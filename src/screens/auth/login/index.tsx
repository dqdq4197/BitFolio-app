import Login from '@/components/auth/login'
import AsyncBoundary from '@/components/common/async-boundary'

const LoginScreen = () => {
  return (
    <AsyncBoundary skeleton={<></>}>
      <Login />
    </AsyncBoundary>
  )
}

export default LoginScreen
