import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import useGlobalTheme from '/hooks/useGlobalTheme';

import { Overview, AddNewCoin } from '/screens/portfolio';
import CoinDetail from './CoinDetail';

const Stack = createStackNavigator();

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
        gestureResponseDistance: {
          horizontal: 20,
        },
      }}
    >
      <Stack.Screen name="portfolioOverview" component={Overview} />
      <Stack.Screen name="AddNewCoin" component={AddNewCoin} />
      <Stack.Screen name="portfolioCoinDetail" component={CoinDetail} />
    </Stack.Navigator>
  );
};

export default PortfolioStack;
