import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import useGlobalTheme from '/hooks/useGlobalTheme';

import { Overview } from '/screens/news';


type RootStackParamList = {
  NewsOverview: undefined;
};

const Stack = createStackNavigator<RootStackParamList>()
const { width } = Dimensions.get("window");

const News = () => {
  const { theme } = useGlobalTheme();

  const NavigationOptions = (title?: string): StackNavigationOptions => {
    return {
      title,
      headerStyle: {
        backgroundColor: theme.base.background.surface,
        shadowColor: 'transparent'
      },
      headerTintColor: theme.base.text[100],
      headerBackTitleVisible: false,
      headerLeftContainerStyle: {
        paddingLeft: 10,
      },
      headerRightContainerStyle: {
        paddingRight: 16
      },
      headerTitleStyle: {
        fontSize: 18
      },
      gestureResponseDistance: {
        horizontal: width
      },
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

export default News;