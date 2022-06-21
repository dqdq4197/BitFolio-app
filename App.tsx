import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Appearance, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components';
import {
  connectActionSheet,
  ActionSheetProvider,
} from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PersistGate } from 'redux-persist/integration/react';

import RootNavigation from '/navigators/Root';
import { store, persistor } from '/store';
import { changeDeviceScheme } from '/store/slices/baseSetting';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppDispatch } from '/hooks/useRedux';
import { AuthProvider } from '/hooks/context/useAuthContext';
import { FeedBackAlertProvider } from '/hooks/context/useFeedBackContext';
import '/lib/lang/i18n';
import '/config/firebase';

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
      Appearance.removeChangeListener(onColorSchemeChange);
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
          <AuthProvider>
            <AppLoader>
              <FeedBackAlertProvider>
                <RootNavigation />
              </FeedBackAlertProvider>
            </AppLoader>
          </AuthProvider>
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
