import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native-appearance';
import { darkTheme, lightTheme } from '/lib/themeColor';
import { ThemeProvider } from 'styled-components';
import TabBar from '/components/TabBar'
import { NewsStackScreen, CoinMarketStackScreen, PortfolioStackScreen } from '/screens';
import { store, persistor } from '/store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

const Tab = createBottomTabNavigator();

export default function App() {

  const scheme = useColorScheme();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider 
          theme={scheme === 'dark' ? darkTheme : lightTheme}
        >
          <SafeAreaProvider>
            <RootNavigation/>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

const RootNavigation = () => (
  <NavigationContainer>
    <Tab.Navigator tabBar={props => <TabBar {...props}/>} initialRouteName="CoinMarket">
      <Tab.Screen name="CoinMarket" options={{title:'시세'}} component={CoinMarketStackScreen} />
      <Tab.Screen name="Portfolio" options={{title: '포트폴리오'}} component={PortfolioStackScreen} />
      <Tab.Screen name="News" options={{title: '뉴스'}} component={NewsStackScreen} />
    </Tab.Navigator>
  </NavigationContainer>
)
