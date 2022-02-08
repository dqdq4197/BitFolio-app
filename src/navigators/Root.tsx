import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { Fontisto, FontAwesome, Ionicons } from '@expo/vector-icons';

import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppSelector } from '/hooks/useRedux';
import { TAB_ROUTE_NAME } from '/lib/constant';

import TabBar from '/components/TabBar';
import Home from './Home';
import Portfolio from './Portfolio';
import News from './News';
import Auth from './Auth';

const Tab = createBottomTabNavigator();

const RootNavigation = () => {
  const { theme } = useGlobalTheme();
  const { t } = useTranslation();
  const { launchScreen } = useAppSelector(state => state.baseSettingReducer);

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <TabBar {...props} />}
        initialRouteName={launchScreen}
        sceneContainerStyle={{
          backgroundColor: theme.base.background[100],
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
          component={Portfolio}
        />
        <Tab.Screen
          name={TAB_ROUTE_NAME.home}
          options={{
            tabBarLabel: t(`common.home`),
            tabBarIcon: ({ color, size }) => (
              <Fontisto name="home" size={size} color={color} />
            ),
          }}
          component={Home}
        />
        <Tab.Screen
          name={TAB_ROUTE_NAME.news}
          options={{
            tabBarLabel: t(`common.news`),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="newspaper" size={size} color={color} />
            ),
          }}
          component={News}
        />
        {/* <Tab.Screen 
          name={TAB_ROUTE_NAME.auth}
          options={{ 
            tabBarLabel: 'Auth',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="airplane" size={size} color={color} />
            )
          }} 
          component={Auth} 
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
