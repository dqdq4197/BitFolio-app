import Login from '@/components/auth/Login'
import AsyncBoundary from '@/components/common/AsyncBoundary'

const LoginScreen = () => {
  return (
    <AsyncBoundary skeleton={<></>}>
      <Login />
    </AsyncBoundary>
  )
}

export default LoginScreen
