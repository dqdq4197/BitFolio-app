import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';

import useGlobalTheme from '/hooks/useGlobalTheme';

import { ChangePassword, ForgotPassword, Login, Register } from '/screens/auth';
import { Language, Overview } from '/screens/setting';

type SettingStackParamList = {
  Overview: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ChangePassword: undefined;
  ScreenTheme: undefined;
  Language: undefined;
  Currency: undefined;
  LaunchScreen: undefined;
};

const Stack = createStackNavigator<SettingStackParamList>();
const { width } = Dimensions.get('window');

const Setting = () => {
  const { t } = useTranslation();
  const { theme } = useGlobalTheme();

  const NavigationOptions = (title?: string): StackNavigationOptions => {
    return {
      title,
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
        paddingRight: 16,
      },
      headerTitleStyle: {
        fontSize: 18,
      },
      gestureResponseDistance: width,
    };
  };

  return (
    <Stack.Navigator initialRouteName="Overview">
      <Stack.Screen
        name="Overview"
        component={Overview}
        options={NavigationOptions('Test')}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={NavigationOptions(t(`auth.login`))}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={NavigationOptions(t(`auth.create an account`))}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={NavigationOptions(t(`auth.forgot password`))}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={NavigationOptions(t(`auth.change password`))}
      />
      <Stack.Screen
        name="ScreenTheme"
        component={Language}
        options={NavigationOptions(t(`auth.change password`))}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={NavigationOptions(t(`auth.change password`))}
      />
      <Stack.Screen
        name="Currency"
        component={Language}
        options={NavigationOptions(t(`auth.change password`))}
      />
      <Stack.Screen
        name="LaunchScreen"
        component={Language}
        options={NavigationOptions(t(`auth.change password`))}
      />
    </Stack.Navigator>
  );
};

export default Setting;
