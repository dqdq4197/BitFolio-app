import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Appearance, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from 'styled-components';
import { Fontisto, FontAwesome, Ionicons } from '@expo/vector-icons';
import { connectActionSheet, ActionSheetProvider } from '@expo/react-native-action-sheet'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from '/store';
import { changeDeviceScheme } from '/store/baseSetting';
import { TAB_ROUTE_NAME } from '/lib/constant';
import { NewsStack, CoinMarketStack, PortfolioScreen } from '/screens';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppDispatch, useAppSelector } from '/hooks/useRedux';
import TabBar from '/components/TabBar'
import '/lib/lang/i18n';

const Tab = createBottomTabNavigator();
LogBox.ignoreAllLogs();

const RootNavigation = () => {
  const { theme } = useGlobalTheme();
  const { t } = useTranslation();
  const { launchScreen } = useAppSelector(state => state.baseSettingReducer);

  return (
    <NavigationContainer>
      <Tab.Navigator 
        tabBar={props => <TabBar {...props}/>} 
        initialRouteName={ launchScreen }
        sceneContainerStyle={{ 
          backgroundColor: theme.base.background[100]
        }}
      >
        <Tab.Screen 
          name={TAB_ROUTE_NAME.portfolio}
          options={{ 
            tabBarLabel: t(`common.portfolio`),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="pie-chart" size={size} color={color} />
            ),
          }} 
          component={PortfolioScreen} 
        />
        <Tab.Screen 
          name={TAB_ROUTE_NAME.home}
          options={{ 
            tabBarLabel: t(`common.home`),
            tabBarIcon: ({ color, size }) => (
              <Fontisto name="home" size={size} color={color} />
            )
          }} 
          component={CoinMarketStack} 
        />
        <Tab.Screen 
          name={TAB_ROUTE_NAME.news}
          options={{ 
            tabBarLabel: t(`common.news`),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="newspaper" size={size} color={color} />
            )
          }} 
          component={NewsStack} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const RootNavigationContainer = () => {
  const { theme } = useGlobalTheme();
  const dispatch = useAppDispatch();
  

  const initAppearanceListener = () => {
    // https://github.com/facebook/react-native/issues/28525
    // wrong color scheme issue ## 
    // debounce로 임시 대처
    let timer:any = null;
    const listener: Appearance.AppearanceListener = ( /* <-- ignore */) => {
      if(timer) clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(changeDeviceScheme(Appearance.getColorScheme()))
      }, 200)
    };
    Appearance.addChangeListener(listener);
    return () => Appearance.removeChangeListener(listener);
  };

  useEffect(() => {
    initAppearanceListener();
  }, [])

  return (
    <ThemeProvider 
      theme={ theme }
    >
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <RootNavigation/>
        </BottomSheetModalProvider>
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
