import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect } from 'react'
import { Appearance, LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

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
  const timeout = React.useRef<NodeJS.Timeout | null>(null)
  const { theme } = useGlobalTheme()
  const dispatch = useAppDispatch()

  const resetCurrentTimeout = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
  }, [])

  const onColorSchemeChange = useCallback(
    (preferences: Appearance.AppearancePreferences) => {
      resetCurrentTimeout()
      timeout.current = setTimeout(() => {
        dispatch(changeDeviceScheme(preferences.colorScheme))
      }, 500)
    },
    [dispatch, resetCurrentTimeout]
  )

  useEffect(() => {
    const { remove } = Appearance.addChangeListener(onColorSchemeChange)

    return () => {
      resetCurrentTimeout()
      remove()
    }
  }, [onColorSchemeChange, resetCurrentTimeout])

  return (
    <QueryClientProvider client={queryClient}>
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
