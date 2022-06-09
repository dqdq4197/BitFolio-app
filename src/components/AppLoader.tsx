import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { useAuthContext } from '/hooks/context/useAuthContext';
import { InitDataProvider } from '/hooks/context/useInitDataContext';

type TProps = {
  children: React.ReactNode;
};

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

const CustomSplashScreen = ({ children }: TProps) => {
  const animation = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  const { isLoading } = useAuthContext();

  // NOTE. 최소 2초 후 로드 & authenticated check가 로딩 중에는 splash 뷰를 보여줌.
  useEffect(() => {
    if (isAppReady && !isLoading) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady, opacity, isLoading]);

  const handleImageLoadEnd = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      // await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      Animated.timing(animation, {
        // NOTE. timeout 용도 -> setTimeout으로 대체 가능.
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => setAppReady(true));
    }
  }, [animation]);

  return (
    <Container>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor:
                (Constants.manifest &&
                  Constants.manifest.splash?.backgroundColor) ||
                '#121212',
              opacity,
            },
          ]}
        >
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode:
                (Constants.manifest && Constants.manifest.splash?.resizeMode) ||
                'contain',
            }}
            // eslint-disable-next-line global-require
            source={require('../../assets/splash.png')}
            onLoadEnd={handleImageLoadEnd}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </Container>
  );
};

const AppLoader = ({ children }: TProps) => {
  return (
    <InitDataProvider>
      <CustomSplashScreen>{children}</CustomSplashScreen>
    </InitDataProvider>
  );
};

export default AppLoader;

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.base.background[200]};
`;
