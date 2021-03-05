import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoinMarketListScreen from './CoinMarketListScreen';
import CoinMarketDetailScreen from './CoinMarketDetailScreen';

type StackProps = {}

const Stack = createStackNavigator();

const CoinMarketStackScreen = ({}:StackProps) => {

  return (
    <Stack.Navigator
      headerMode="none"
    >
      <Stack.Screen name="CoinMarketList" component={CoinMarketListScreen}/>
      <Stack.Screen name="CoinMarketDetail" component={CoinMarketDetailScreen}/>
    </Stack.Navigator>
  )
}


export default CoinMarketStackScreen;