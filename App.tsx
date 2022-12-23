import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useEffect } from 'react';
import { Appearance, LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import '/config/firebase';
// import { AuthProvider } from '/hooks/context/useAuthContext';
import { FeedBackAlertProvider } from '/hooks/context/useFeedBackContext';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppDispatch } from '/hooks/useRedux';
import '/lib/lang/i18n';
import RootNavigation from '/navigators/Root';
import { persistor, store } from '/store';
import { changeDeviceScheme } from '/store/slices/baseSetting';

import AppLoader from '/components/AppLoader';

LogBox.ignoreAllLogs();

const RootNavigationContainer = () => {
  const timeout = React.useRef<NodeJS.Timeout | null>(null);
  const { theme } = useGlobalTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    Appearance.addChangeListener(onColorSchemeChange);

    return () => {
      resetCurrentTimeout();
      // Appearance.removeChangeListener(onColorSchemeChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onColorSchemeChange(preferences: Appearance.AppearancePreferences) {
    resetCurrentTimeout();
    timeout.current = setTimeout(() => {
      dispatch(changeDeviceScheme(preferences.colorScheme));
    }, 500);
  }

  function resetCurrentTimeout() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          {/* <AuthProvider> */}
          <AppLoader>
            <FeedBackAlertProvider>
              <RootNavigation />
            </FeedBackAlertProvider>
          </AppLoader>
          {/* </AuthProvider> */}
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigationContainer />
      </PersistGate>
    </Provider>
  );
}

const ConnectedApp = connectActionSheet(App);

export default function AppContainer() {
  return (
    <ActionSheetProvider>
      <ConnectedApp />
    </ActionSheetProvider>
  );
}
