import { FontAwesome, Fontisto, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '/hooks/useRedux';
import type { MainTabParamList } from '/types/navigation';

import Home from './Home';
import News from './News';
import Portfolio from './Portfolio';
import TabBar from '/components/TabBar';

const Tab = createBottomTabNavigator<MainTabParamList>();

const Main = () => {
  const { t } = useTranslation();
  const { launchScreen } = useAppSelector(state => state.baseSettingReducer);

  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      initialRouteName={launchScreen}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Portfolio"
        options={{
          tabBarLabel: t(`common.portfolio`),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="pie-chart" size={size} color={color} />
          ),
        }}
        component={Portfolio}
      />
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: t(`common.home`),
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="home" size={size} color={color} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="News"
        options={{
          tabBarLabel: t(`common.news`),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" size={size} color={color} />
          ),
        }}
        component={News}
      />
    </Tab.Navigator>
  );
};

export default Main;
