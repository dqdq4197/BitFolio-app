import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const AuthContext = createContext<ValueType | undefined>(undefined)

type ValueType = {
  isLoading: boolean
  currentUser: FirebaseAuthTypes.User | null
}

type ProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: ProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(
    null
  )

  useEffect(() => {
    if (auth && !auth().currentUser?.emailVerified) {
      auth()
        .signOut()
        .then(() => console.log('초기 로드 & 로그 아웃'))
    }
  }, [])

  /**
   * 로그인 시.
   * 이메일 인증되어 있으면 정상적으로 홈 리다이렉트
   * 이메일 인증 안되어 있으면 이메일 인증 페이지로 이동
   * 회원 가입 시.
   * 회원 가입하고 이메일 인증 페이지로 이동
   *
   * 공통.
   * 이메일 인증 페이지에서 나가면 sign out
   * 최초 앱 실행시.
   * 이메일 인증 여부 확인하고, 인증 했으면 정상 작동
   * 안했으면 sign out
   *
   * 이메일 인증 완료하면 user.reload() 실행
   */
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setCurrentUser(user)

      if (isLoading) {
        setIsLoading(false)
      }
    })

    return subscriber
  }, [isLoading])

  const initialData = useMemo(
    () => ({
      currentUser,
      isLoading,
    }),
    [currentUser, isLoading]
  )

  return (
    <AuthContext.Provider value={initialData}>{children}</AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(`AuthContext is undefined`)
  }
  return context
}
