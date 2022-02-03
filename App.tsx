import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Appearance, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components';
import { connectActionSheet, ActionSheetProvider } from '@expo/react-native-action-sheet'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PersistGate } from "redux-persist/integration/react";

import RootNavigation from '/navigators/Root';
import { store, persistor } from '/store';
import { changeDeviceScheme } from '/store/baseSetting';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppDispatch } from '/hooks/useRedux';
import '/lib/lang/i18n';

LogBox.ignoreAllLogs();

const RootNavigationContainer = () => {
  const { theme } = useGlobalTheme();
  const dispatch = useAppDispatch();

  const initAppearanceListener = () => {
    // https://github.com/facebook/react-native/issues/28525
    // wrong color scheme issue ## 
    // debounce로 임시 대처
    let timer:any = null;
    const listener: Appearance.AppearanceListener = ( /* <-- ignore */) => {
      if(timer) clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(changeDeviceScheme(Appearance.getColorScheme()))
      }, 200)
    };
    Appearance.addChangeListener(listener);
    return () => Appearance.removeChangeListener(listener);
  };

  useEffect(() => {
    initAppearanceListener();
  }, [])

  return (
    <ThemeProvider 
      theme={ theme }
    >
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <RootNavigation/>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

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
      <ConnectedApp/>
    </ActionSheetProvider>
  )
};