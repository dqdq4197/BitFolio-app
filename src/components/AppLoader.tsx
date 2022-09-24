import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';

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

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        // timeout 용도 -> setTimeout으로 대체 가능.
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() =>
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => setAnimationComplete(true))
      );
    }
  }, [animation, isAppReady, opacity]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      // await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
};

const AppLoader = ({ children }: TProps) => {
  return (
    <InitDataProvider>
      {/* {children} */}
      <CustomSplashScreen>{children}</CustomSplashScreen>
    </InitDataProvider>
  );
};

export default AppLoader;
