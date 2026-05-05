import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Animated, Image, StyleSheet } from 'react-native'
import styled from 'styled-components/native'

import { InitDataProvider } from '@/hooks/context/useInitDataContext'

SplashScreen.preventAutoHideAsync()

const CustomSplashScreen = ({ children }: Props) => {
  const animation = useRef(new Animated.Value(0)).current
  const opacity = useRef(new Animated.Value(1)).current
  const [isAppReady, setAppReady] = useState(false)
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false)

  // NOTE. 최소 2초 후 로드 & authenticated check가 로딩 중에는 splash 뷰를 보여줌.
  useEffect(() => {
    if (isAppReady) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true))
    }
  }, [isAppReady, opacity])

  const handleImageLoadEnd = useCallback(async () => {
    try {
      await SplashScreen.hideAsync()
    } catch (e) {
      // handle errors
    } finally {
      Animated.timing(animation, {
        // NOTE. timeout 용도 -> setTimeout으로 대체 가능.
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => setAppReady(true))
    }
  }, [animation])

  return (
    <Container>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#121212',
              opacity,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <Image
            style={{
              width: 400,
              height: '100%',
              resizeMode: 'contain',
            }}
            source={{
              uri: 'https://github.com/dqdq4197/BitFolio-app/blob/master/assets/splash.png?raw=true',
            }}
            onLoadEnd={handleImageLoadEnd}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </Container>
  )
}

interface Props {
  children: ReactNode
}

const AppLoader = ({ children }: Props) => {
  return (
    <InitDataProvider>
      <CustomSplashScreen>{children}</CustomSplashScreen>
    </InitDataProvider>
  )
}

export default AppLoader

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.base.background[200]};
`
