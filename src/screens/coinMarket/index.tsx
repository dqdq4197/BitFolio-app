import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator, StackNavigationOptions  } from '@react-navigation/stack';
import DetailTab from './detail';
import ListScreen from './list';
import { darkTheme, lightTheme } from '/lib/themeColor';
import { useColorScheme } from 'react-native-appearance';
import { Ionicons } from '@expo/vector-icons';


type StackProps = {}

const Stack = createStackNavigator()
const { width } = Dimensions.get("window");
const CoinMarketStack = ({}:StackProps) => {

  const scheme = useColorScheme();
  const NavigationOptions: StackNavigationOptions | any = (title?: string) => {
    return {
      title,
      headerTransparent: true,
      headerTintColor: 
        scheme === 'dark'
        ? darkTheme.base.text[100]
        : lightTheme.base.text[100],
      headerRight: () => (
        <Ionicons name="md-settings-outline" size={24} color="white" />
      ),
      headerBackTitleVisible: false,
      headerLeftContainerStyle: {
        paddingLeft: 10,
      },
      headerRightContainerStyle: {
        paddingRight: 16
      },
      headerTitleStyle: {
        fontSize: 20,
      },
      gestureEnabled: false,
      // gestureResponseDistance: {
      //   horizontal: width
      // },
    }
  }

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CoinMarketList" 
        component={ListScreen}
        options={NavigationOptions('Market')}
      />
      <Stack.Screen 
        name="CoinMarketDetail" 
        component={DetailTab}
        options={NavigationOptions('Detail')}
      />
    </Stack.Navigator>
  )
}


export default CoinMarketStack;