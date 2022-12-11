import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import useGlobalTheme from '/hooks/useGlobalTheme';
import type { PortfolioParamList } from '/types/navigation';

import { Overview, AddNewCoin } from '/screens/portfolio';
import CoinDetail from './CoinDetail';

const Stack = createStackNavigator<PortfolioParamList>();

const PortfolioStack = () => {
  const { theme } = useGlobalTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
        headerStyle: {
          backgroundColor: theme.base.background.surface,
          shadowColor: 'transparent',
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
      <Stack.Screen name="PortfolioOverview" component={Overview} />
      <Stack.Screen name="AddNewCoin" component={AddNewCoin} />
      <Stack.Screen name="PortfolioCoinDetail" component={CoinDetail} />
    </Stack.Navigator>
  );
};

export default PortfolioStack;
