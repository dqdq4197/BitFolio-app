import React from 'react';
import { createStackNavigator, StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import useGlobalTheme from '/hooks/useGlobalTheme';
import DetailTab from './detail';
import HomeScreen from './home';
import NewCoinScreen from './newCoin';
import highMarketCapScreen from "./highMarketCap";
import highVolumeScreen from "./highVolume";
import searchScreen from './search';

type StackProps = {
}

const Stack = createStackNavigator()
const CoinMarketStack = ({ navigation }:StackScreenProps<any, any>) => {

  const theme = useGlobalTheme();

  const handleSearchPress = () => {
    navigation.navigate('CoinSearch');
  }
  
  const NavigationOptions: StackNavigationOptions | any = (title: string) => {
    return {
      title,
      headerStyle: {
        backgroundColor: theme.base.background.surface,
        shadowColor: 'transparent', // theme.base.background[300]
      },
      headerTintColor: theme.base.text[100],
      headerRight: () => (
        <IconWrap>
          <Ionicons 
            name="search-sharp" 
            size={28} 
            color={theme.base.text[200]} 
            style={{
              marginRight: 20,
            }} 
            onPress={handleSearchPress}
          />
          <Ionicons name="md-settings-outline" size={24} color={theme.base.text[200]} />
        </IconWrap>
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
        options={NavigationOptions('')}
      />
      <Stack.Screen 
        name="CoinHighVolume" 
        component={highVolumeScreen}
        options={NavigationOptions('')}
      />
      <Stack.Screen 
        name="CoinSearch" 
        component={searchScreen}
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