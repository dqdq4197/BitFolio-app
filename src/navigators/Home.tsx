import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import useGlobalTheme from '/hooks/useGlobalTheme';

import {
  Gainers,
  HighMarkeCap,
  NewCoin,
  HighVolume,
  Main,
  Losers,
  Search,
} from '/screens/coinMarket';
import CoinDetail from './CoinDetail';

const Stack = createStackNavigator();

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
        gestureResponseDistance: {
          horizontal: 20,
        },
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
