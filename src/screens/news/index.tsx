import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import OverviewScreen from './Overview';


type RootStackParamList = {
  NewsOverview: undefined;
};

const Stack = createStackNavigator<RootStackParamList>()
const { width } = Dimensions.get("window");

const News = () => {
  const { theme } = useGlobalTheme();

  const NavigationOptions = (title?: string) => {
    return {
      title,
      headerStyle: {
        backgroundColor: theme.base.background.surface,
        shadowColor: 'transparent', // theme.base.background[300]
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
        fontSize: 20
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
        component={OverviewScreen}
        options={NavigationOptions('News')}
      />
    </Stack.Navigator>
  )
}

export default News;