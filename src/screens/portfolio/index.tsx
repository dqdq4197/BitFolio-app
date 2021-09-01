import React from 'react';
import { createStackNavigator, StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';
import useGlobalTheme from '/hooks/useGlobalTheme';
import OverviewScreen from './overview';
import AddTrackScreen from './addTrack';
import DetailTab from '/screens/coinMarket/detail'

type StackProps = {}

const Stack = createStackNavigator()
const PortfolioStack = ({ navigation }:StackScreenProps<any, any>) => {
  const { theme } = useGlobalTheme();
  
  const NavigationOptions: StackNavigationOptions | any = (title: string) => {
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
        name="portfolioOverview" 
        component={OverviewScreen}
        options={NavigationOptions('')}
      />
      <Stack.Screen 
        name="AddTrack" 
        component={AddTrackScreen}
        options={NavigationOptions('')}
      />
      <Stack.Screen 
        name="portfolioCoinDetail" 
        component={DetailTab}
        options={NavigationOptions('Detail')}
      />
    </Stack.Navigator>
  )
}


export default PortfolioStack;
