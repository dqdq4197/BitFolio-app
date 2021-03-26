import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CoinMarketListScreen from './CoinMarketListScreen';
import CoinMarketDetailScreen from './CoinMarketDetailScreen';
import { darkTheme, lightTheme } from '/lib/themeColor';
import { useColorScheme } from 'react-native-appearance';
import { Ionicons } from '@expo/vector-icons';


type StackProps = {}

const Stack = createStackNavigator()
const { width } = Dimensions.get("window");
const CoinMarketStackScreen = ({}:StackProps) => {

  const scheme = useColorScheme();
  const NavigationOptions = (title?: string) => {
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
        name="CoinMarketList" 
        component={CoinMarketListScreen}
        options={NavigationOptions('Market')}
      />
      <Stack.Screen 
        name="CoinMarketDetail" 
        component={CoinMarketDetailScreen}
        options={NavigationOptions()}
      />
    </Stack.Navigator>
  )
}


export default CoinMarketStackScreen;