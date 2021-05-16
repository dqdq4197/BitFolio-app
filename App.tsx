import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from 'styled-components';
import TabBar from '/components/TabBar'
import { NewsStackScreen, CoinMarketStack, PortfolioScreen } from '/screens';
import { store, persistor } from '/store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { connectActionSheet, ActionSheetProvider } from '@expo/react-native-action-sheet'
import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppDispatch } from '/hooks/useRedux';
import { changeTheme } from '/store/baseSetting';
import '/lib/lang/i18n';

const Tab = createBottomTabNavigator();

const RootNavigation = () => {
  const { theme } = useGlobalTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator 
        tabBar={props => <TabBar {...props}/>} 
        initialRouteName="CoinMarket" 
        sceneContainerStyle={{ 
          backgroundColor: theme.base.background[100]
        }}
      >
        <Tab.Screen name="Portfolio" options={{ title: '포트폴리오' }} component={PortfolioScreen} />
        <Tab.Screen name="CoinMarket" options={{ title:'시세' }} component={CoinMarketStack} />
        <Tab.Screen name="News" options={{ title: '뉴스' }} component={NewsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const RootNavigationContainer = () => {
  const { theme } = useGlobalTheme();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    Appearance.addChangeListener(onThemeChange)
    return () => Appearance.removeChangeListener(onThemeChange);
  }, [])

  const onThemeChange = ({ colorScheme }: Appearance.AppearancePreferences) => {
    dispatch(changeTheme(colorScheme))
  }

  return (
    <ThemeProvider 
      theme={ theme }
    >
      <SafeAreaProvider >
        <RootNavigation/>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigationContainer />
      </PersistGate>
    </Provider>
  );
}

const ConnectedApp = connectActionSheet(App);

export default function AppContainer() {
  return (
    <ActionSheetProvider>
      <ConnectedApp/>
    </ActionSheetProvider>
  )
};
