import React from 'react'
import { Dimensions } from 'react-native'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { MaterialIcons } from '@expo/vector-icons'

import useGlobalTheme from '/hooks/useGlobalTheme'
import type { NewsParamList } from '/types/navigation'

import { Overview } from '/screens/news'

const Stack = createStackNavigator<NewsParamList>()
const { width } = Dimensions.get('window')

const News = () => {
  const { theme } = useGlobalTheme()

  const NavigationOptions = (title?: string): StackNavigationOptions => {
    return {
      title,
      headerStyle: {
        backgroundColor: theme.base.background.surface,
        shadowColor: 'transparent',
      },
      headerBackImage: () => (
        <MaterialIcons
          name="arrow-back-ios-new"
          size={24}
          color={theme.base.text[100]}
        />
      ),
      headerTintColor: theme.base.text[100],
      headerBackTitleVisible: false,
      headerLeftContainerStyle: {
        paddingLeft: 10,
      },
      headerRightContainerStyle: {
        paddingRight: parseInt(theme.content.spacing, 10),
      },
      headerTitleStyle: {
        fontSize: parseInt(theme.size.font_l, 10),
      },
      gestureResponseDistance: width,
    }
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewsOverview"
        component={Overview}
        options={NavigationOptions('News')}
      />
    </Stack.Navigator>
  )
}

export default News
