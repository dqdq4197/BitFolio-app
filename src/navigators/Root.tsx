import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import useGlobalTheme from '/hooks/useGlobalTheme'
import type { RootStackParamList } from '/types/navigation'

import Main from './Main'
// import Setting from './Setting';

const Stack = createStackNavigator<RootStackParamList>()

const RootNavigation = () => {
  const { scheme } = useGlobalTheme()
  return (
    // NOTE. theme을 제공해서 스크린 전환 시 backdrop 영역에 base color를 고정하기 위함.
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Main} />
        {/* <Stack.Screen
          name="Setting"
          component={Setting}
          options={{ presentation: 'modal', cardOverlayEnabled: true }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation
