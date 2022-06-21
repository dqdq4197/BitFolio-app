import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from 'react';
import {
  getAuth,
  onAuthStateChanged,
  User,
  signOut,
  Auth,
} from 'firebase/auth';

const AuthContext = createContext<ValueType | undefined>(undefined);

type ValueType = {
  isLoading: boolean;
  currentUser: User | null;
  auth: Auth;
};

type ProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: ProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    if (auth && !auth.currentUser?.emailVerified) {
      signOut(auth);
      console.log('초기 로드 & 로그 아웃');
    }
  }, [auth]);

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
    const unSubscribeAuth = onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
      }

      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }

      setIsLoading(false);
    });

    return unSubscribeAuth;
  }, [auth]);

  const initialData = useMemo(
    () => ({
      auth,
      currentUser,
      isLoading,
    }),
    [auth, currentUser, isLoading]
  );

  return (
    <AuthContext.Provider value={initialData}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`AuthContext is undefined`);
  }
  return context;
}
