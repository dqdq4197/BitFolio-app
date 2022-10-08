import React from 'react';
import { Dimensions } from 'react-native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import useGlobalTheme from '/hooks/useGlobalTheme';
import type { SettingParamList } from '/types/navigation';

import {
  Login,
  Register,
  ForgotPassword,
  ChangePassword,
  EmailVerification,
} from '/screens/auth';
import {
  Overview,
  Language,
  Currency,
  LaunchScreen,
  ScreenTheme,
  AuthSetting,
} from '/screens/setting';

const Stack = createStackNavigator<SettingParamList>();
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
        options={NavigationOptions('')}
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
        name="EmailVerification"
        component={EmailVerification}
        options={NavigationOptions('')}
      />
      <Stack.Screen
        name="AuthSetting"
        component={AuthSetting}
        options={NavigationOptions('')}
      />
      <Stack.Screen
        name="ScreenTheme"
        component={ScreenTheme}
        options={NavigationOptions('')}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={NavigationOptions('')}
      />
      <Stack.Screen
        name="Currency"
        component={Currency}
        options={NavigationOptions('')}
      />
      <Stack.Screen
        name="LaunchScreen"
        component={LaunchScreen}
        options={NavigationOptions('')}
      />
    </Stack.Navigator>
  );
};

export default Setting;
