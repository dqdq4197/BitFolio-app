import React from 'react';
import { createStackNavigator, StackNavigationOptions  } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import DetailTab from './detail';
import HomeScreen from './home';
import NewCoinScreen from './newCoin';
import highMarketCapScreen from "./highMarketCap";
import highVolumeScreen from "./highVolume";

type StackProps = {}

const Stack = createStackNavigator()
const CoinMarketStack = ({}:StackProps) => {

  const theme = useGlobalTheme();
  const NavigationOptions: StackNavigationOptions | any = (title: string) => {
    return {
      title,
      headerStyle: {
        backgroundColor: theme.base.background.surface,
        shadowColor: 'transparent'
      },
      headerTintColor: theme.base.text[100],
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
      gestureEnabled: true,
      gestureResponseDistance: {
        horizontal: 20
      },
    }
  }

  return (
    <Stack.Navigator headerMode='screen'>
      <Stack.Screen 
        name="CoinMarketHome" 
        component={HomeScreen}
        options={NavigationOptions('Market')}
      />
      <Stack.Screen 
        name="CoinDetail" 
        component={DetailTab}
        options={NavigationOptions('Detail')}
      />
      <Stack.Screen 
        name="NewCoin" 
        component={NewCoinScreen}
        options={NavigationOptions('NewCoin')}
      />
      <Stack.Screen 
        name="CoinHighMarketCap" 
        component={highMarketCapScreen}
        options={NavigationOptions('CoinHighMarketCap')}
      />
      <Stack.Screen 
        name="CoinHighVolume" 
        component={highVolumeScreen}
        options={NavigationOptions('CoinHighVolume')}
      />
    </Stack.Navigator>
  )
}


export default CoinMarketStack;