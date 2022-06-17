import { useState, useMemo, useCallback } from 'react';
import {
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  getAuth,
  UserCredential,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { useTranslation } from 'react-i18next';

const useCreateUserWithEmailAndPassword = () => {
  const { t } = useTranslation();
  const auth = getAuth();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [user, setUser] = useState<UserCredential>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createUserWithEmailAndPassword = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setErrorMessage(undefined);
      try {
        const userCredential = await firebaseCreateUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(userCredential);
      } catch (error) {
        if (error instanceof FirebaseError) {
          const { code } = error;
          let message = '';
          console.log(code);

          switch (code) {
            case 'auth/email-already-in-use':
              message = t(`auth.errorMessage.email-already-in-use`);
              break;
            case 'auth/too-many-requests':
              message = t(`auth.errorMessage.too-many-requests`);
              break;
            default:
              message = t(`auth.errorMessage.unkown-error`);
              break;
          }

          setErrorMessage(message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [auth, t]
  );

  return useMemo(
    () => ({
      createUserWithEmailAndPassword,
      user,
      errorMessage,
      isLoading,
    }),
    [createUserWithEmailAndPassword, errorMessage, isLoading, user]
  );
};

export default useCreateUserWithEmailAndPassword;
