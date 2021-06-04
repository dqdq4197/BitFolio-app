import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import TabBar from '/components/TabBar'
import { NewsStackScreen, CoinMarketStack, PortfolioScreen } from '/screens';
import { store, persistor } from '/store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
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
        <Tab.Screen 
          name="Portfolio" 
          options={{ 
            tabBarLabel: '포트폴리오',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-albums" size={size} color={color} />
            ),
          }} 
          component={PortfolioScreen} 
        />
        <Tab.Screen 
          name="CoinMarket" 
          options={{ 
            tabBarLabel:'시세',
            tabBarIcon: ({ color, size }) => (
              <Entypo name="area-graph" size={size} color={color} />
            )
          }} 
          component={CoinMarketStack} 
        />
        <Tab.Screen 
          name="News" 
          options={{ 
            tabBarLabel: '뉴스',
            tabBarIcon: ({ color, size }) => (
              <Entypo name="newsletter" size={size} color={color} />
            )
          }} 
          component={NewsStackScreen} 
        />
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
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <RootNavigation/>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
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
