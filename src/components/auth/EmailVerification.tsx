import React, { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { useTranslation, Trans } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import * as habtics from 'expo-haptics'

import { useFeedBackAlertContext } from '/hooks/context/useFeedBackContext'
import { useSendEmailVerification } from '/hooks/firebase'
import { useAuthContext } from '/hooks/context/useAuthContext'
import type { SettingScreenProps } from '/types/navigation'

import { Text, Stack } from '/components/common'

const RESENT_DELAY = 60

function timeToSeconds(timer: number) {
  const seconds = timer < 10 ? `0${timer}` : timer
  return `00:${seconds}`
}

/**
 * mount시 메일 전송 & Lottie 시작
 * 메일에서 이메일 확인할 때 까지 Interval로 체크
 * email verify 되었으면 애니메이션 체크 모션까지(끝) 재생 후
 * Home으로 redirect & 회원 가입 축하 snackbar 오픈
 */

const EmailVerification = () => {
  const { t } = useTranslation()
  const { currentUser } = useAuthContext()
  const { openAlert } = useFeedBackAlertContext()
  const animationRef = useRef<LottieView>(null)
  const progress = useRef(new Animated.Value(0)).current
  const timer = useRef<NodeJS.Timer | null>(null)
  const [time, setTime] = useState(RESENT_DELAY)
  const [trigger, setTrigger] = useState(false)
  const { errorMessage, sendEmailVerification, verified } =
    useSendEmailVerification()
  const navigation =
    useNavigation<SettingScreenProps<'EmailVerification'>['navigation']>()

  useEffect(() => {
    if (verified) {
      Animated.timing(progress, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        openAlert({
          message: '회원가입이 성공적으로 완료되었습니다.',
          severity: 'success',
          type: 'snackbar',
        })
        navigation.navigate('Main', {
          screen: 'Home',
          params: { screen: 'CoinMarketHome' },
        })
      })
    }
  }, [navigation, openAlert, progress, verified])

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play(0, 80)
    }
    sendEmailVerification()
  }, [sendEmailVerification])

  useEffect(() => {
    if (errorMessage) {
      openAlert({ message: errorMessage, type: 'snackbar', severity: 'error' })
    }
  }, [errorMessage, openAlert])

  useEffect(() => {
    setTime(prev => prev - 1)
    timer.current = setInterval(() => {
      setTime(prev => {
        if (prev === 1 && timer.current) {
          clearInterval(timer.current)
          return RESENT_DELAY
        }
        return prev - 1
      })
    }, 1000)

    // eslint-disable-next-line consistent-return
    return () => {
      if (timer.current) return clearInterval(timer.current)
    }
  }, [trigger])

  const onPressResendEmailText = async () => {
    await sendEmailVerification()
    habtics.impactAsync()
    setTrigger(prev => !prev)
  }

  return (
    <Stack
      flex={1}
      bgColor="surface"
      justifyContent="space-around"
      px="content"
    >
      <Stack height={300} alignItems="center" justifyContent="space-between">
        <LottieView
          ref={animationRef}
          source={require('../../../assets/lottie/emailVerification.json')}
          loop={!verified}
          autoPlay
          style={{
            width: 180,
            height: 180,
          }}
          progress={progress}
        />
        <Text fontXL color100 bold>
          {t(`auth.verify your email`)}
        </Text>
        <Text lineHeight={20} center fontML>
          <Trans
            i18nKey="auth.verify email guide"
            values={{ email: currentUser?.email || ' ' }}
            components={{ em: <Text color100 bold /> }}
          />
        </Text>
      </Stack>
      <Stack>
        {time === RESENT_DELAY ? (
          <Text onPress={onPressResendEmailText} primaryColor center fontML>
            {t(`auth.resend email`)}
          </Text>
        ) : (
          <Text center fontML color100>
            <Trans
              i18nKey="auth.resend email guide"
              values={{ time: timeToSeconds(time) }}
              components={{ br: '\n' }}
            />
          </Text>
        )}
      </Stack>
    </Stack>
  )
}

export default EmailVerification
