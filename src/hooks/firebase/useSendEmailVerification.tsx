import { FirebaseError } from '@firebase/util'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAuthContext } from '/hooks/context/useAuthContext'
import { expectUnreachable } from '/lib/utils/sweet'

const useSendEmailVerification = () => {
  const { t } = useTranslation()
  const { currentUser } = useAuthContext()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [verified, setVerified] = useState(false)

  // 1초마다 인증 완료 여부 체크.
  useEffect(() => {
    if (currentUser) {
      setVerified(currentUser.emailVerified)
      const interval = setInterval(async () => {
        await currentUser.reload()
        if (currentUser.emailVerified) {
          setVerified(true)
          clearInterval(interval)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [currentUser])

  const sendEmailVerification = useCallback(async () => {
    if (!currentUser || currentUser.emailVerified) return
    setIsLoading(true)
    setErrorMessage(undefined)
    try {
      await currentUser.sendEmailVerification({
        url:
          process.env.EXPO_PUBLIC_FIREBASE_EMAIL_VERIFICATION_DYNAMICLINK ??
          expectUnreachable(
            'must exist email verification dynamic link in env file'
          ),
        iOS: {
          bundleId: process.env.EXPO_PUBLIC_APP_BUNDLE_ID,
        },
      })
    } catch (error) {
      let message = t(`auth.errorMessage.unkown-error`)
      if (error instanceof FirebaseError) {
        const { code } = error

        switch (code) {
          case 'auth/too-many-requests':
            message = t(`auth.errorMessage.too-many-requests`)
            break
          default:
            break
        }
      }
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }, [currentUser, t])

  return useMemo(
    () => ({
      sendEmailVerification,
      errorMessage,
      isLoading,
      verified,
    }),
    [errorMessage, isLoading, sendEmailVerification, verified]
  )
}

export default useSendEmailVerification
