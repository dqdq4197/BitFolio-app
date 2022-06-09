import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const AuthContext = createContext<ValueType | undefined>(undefined);

type ValueType = {
  isLoading: boolean;
  currentUser: User | null;
};

type ProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: ProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unSubscribeAuth;
  }, [auth]);

  const initialData = useMemo(
    () => ({
      currentUser,
      isLoading,
    }),
    [currentUser, isLoading]
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
