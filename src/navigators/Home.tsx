import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import useGlobalTheme from '/hooks/useGlobalTheme';
import type { HomeParamList } from '/types/navigation';

import CoinDetail from './CoinDetail';
import {
  Gainers,
  HighMarkeCap,
  HighVolume,
  Losers,
  Main,
  NewCoin,
  Search,
} from '/screens/coinMarket';

const Stack = createStackNavigator<HomeParamList>();

const Home = () => {
  const { theme } = useGlobalTheme();

  return (
    <Stack.Navigator
      initialRouteName="CoinMarketHome"
      screenOptions={{
        title: '',
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
          paddingRight: parseInt(theme.content.spacing, 10),
        },
        headerTitleStyle: {
          fontSize: parseInt(theme.size.font_l, 10),
        },
        gestureEnabled: true,
        gestureResponseDistance: 20,
      }}
    >
      <Stack.Screen name="CoinMarketHome" component={Main} />
      <Stack.Screen name="CoinDetail" component={CoinDetail} />
      <Stack.Screen name="NewCoin" component={NewCoin} />
      <Stack.Screen name="CoinHighMarketCap" component={HighMarkeCap} />
      <Stack.Screen name="CoinHighVolume" component={HighVolume} />
      <Stack.Screen name="Gainers" component={Gainers} />
      <Stack.Screen name="Losers" component={Losers} />
      <Stack.Screen name="CoinSearch" component={Search} />
    </Stack.Navigator>
  );
};

export default Home;
