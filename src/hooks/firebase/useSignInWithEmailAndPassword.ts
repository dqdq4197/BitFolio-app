import { useState, useCallback, useMemo } from 'react'
import { FirebaseError } from '@firebase/util'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useTranslation } from 'react-i18next'

export default () => {
  const { t } = useTranslation()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [user, setUser] = useState<FirebaseAuthTypes.UserCredential>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signInWithEmailAndPassword = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true)
      setErrorMessage(undefined)
      try {
        const loggedInUser = await auth().signInWithEmailAndPassword(
          email,
          password
        )
        setUser(loggedInUser)
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          const { code } = error
          let message = ''

          switch (code) {
            case 'auth/user-not-found':
              message = t(`auth.errorMessage.user-not-found`)
              break
            case 'auth/wrong-password':
              message = t(`auth.errorMessage.wrong-password`)
              break
            case 'auth/too-many-requests':
              message = t(`auth.errorMessage.too-many-requests`)
              break
            case 'auth/user-disabled':
              message = t(`auth.errorMessage.user-disabled`)
              break
            default:
              message = 'An undefined Error happened.'
              break
          }

          setErrorMessage(message)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [t]
  )

  return useMemo(
    () => ({
      signInWithEmailAndPassword,
      user,
      errorMessage,
      isLoading,
    }),
    [errorMessage, isLoading, signInWithEmailAndPassword, user]
  )
}
