import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import React, { useEffect } from 'react'
import { LogBox, useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components/native'

import { FeedBackAlertProvider } from '/hooks/context/useFeedBackContext'
import useGlobalTheme from '/hooks/useGlobalTheme'
import { useAppDispatch } from '/hooks/useRedux'
import RootNavigation from '/navigators/Root'
import { persistor, store } from '/store'
import { changeDeviceScheme } from '/store/slices/baseSetting'

import AppLoader from '/components/AppLoader'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import '/lib/lang/i18n'

LogBox.ignoreAllLogs()

const queryClient = new QueryClient()

const RootNavigationContainer = () => {
  const { scheme, theme } = useGlobalTheme()
  const dispatch = useAppDispatch()
  const colorScheme = useColorScheme()

  useEffect(() => {
    dispatch(changeDeviceScheme(colorScheme))
  }, [colorScheme, dispatch])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar
            translucent
            animated
            backgroundColor="transparent"
            style={scheme === 'dark' ? 'light' : 'dark'}
          />
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
    </QueryClientProvider>
  )
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigationContainer />
      </PersistGate>
    </Provider>
  )
}

const ConnectedApp = connectActionSheet(App)

export default function AppContainer() {
  return (
    <GestureHandlerRootView>
      <ActionSheetProvider>
        <ConnectedApp />
      </ActionSheetProvider>
    </GestureHandlerRootView>
  )
}
