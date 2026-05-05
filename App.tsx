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

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { changeDeviceScheme } from '@/store/slices/baseSetting'
import AppLoader from '@/components/AppLoader'
import { persistor, store } from '@/store'
import RootNavigation from '@/navigators/Root'
import { useAppDispatch } from '@/hooks/useRedux'
import useGlobalTheme from '@/hooks/useGlobalTheme'
import { FeedBackAlertProvider } from '@/hooks/context/useFeedBackContext'
import '@/lib/lang/i18n'

LogBox.ignoreAllLogs()

const queryClient = new QueryClient()

const RootNavigationContainer = () => {
  const { scheme, theme } = useGlobalTheme()
  const dispatch = useAppDispatch()
  const colorScheme = useColorScheme()

  useEffect(() => {
    dispatch(
      changeDeviceScheme(colorScheme === 'unspecified' ? 'dark' : colorScheme)
    )
  }, [colorScheme, dispatch])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar animated style={scheme === 'dark' ? 'light' : 'dark'} />
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
