import React from 'react';
import { createStackNavigator, StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';
import styled from 'styled-components/native';
import useGlobalTheme from '/hooks/useGlobalTheme';
import DetailTab from './detail';
import HomeScreen from './home';
import NewCoinScreen from './newCoin';
import HighMarketCapScreen from "./highMarketCap";
import HighVolumeScreen from "./highVolume";
import SearchSreen from './search';
import GainersScreen from './gainers';
import LosersScreen from './losers';

type StackProps = {}

const Stack = createStackNavigator()
const CoinMarketStack = ({ navigation }:StackScreenProps<any, any>) => {
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
        options={NavigationOptions('')}
      />
      <Stack.Screen 
        name="CoinHighMarketCap" 
        component={HighMarketCapScreen}
        options={NavigationOptions('')}
      />
      <Stack.Screen 
        name="CoinHighVolume" 
        component={HighVolumeScreen}
        options={NavigationOptions('')}
      />
      <Stack.Screen 
        name="Gainers" 
        component={GainersScreen}
        options={NavigationOptions('')}
      />
      <Stack.Screen 
        name="Losers" 
        component={LosersScreen}
        options={NavigationOptions('')}
      />
      <Stack.Screen 
        name="CoinSearch" 
        component={SearchSreen}
        options={NavigationOptions('CoinSearch')}
      />
    </Stack.Navigator>
  )
}


export default CoinMarketStack;

const IconWrap = styled.View`
  flex-direction: row;
  align-items: center;
`