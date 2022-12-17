import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';

import useGlobalTheme from '/hooks/useGlobalTheme';

import AuthMainTest from './AuthMainTest';
import { ChangePassword, ForgotPassword, Login, Register } from '/screens/auth';

type RootStackParamList = {
  Test: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ChangePassword: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const { width } = Dimensions.get('window');

const News = () => {
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
    <Stack.Navigator initialRouteName="Test">
      <Stack.Screen
        name="Test"
        component={AuthMainTest}
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
    </Stack.Navigator>
  );
};

export default News;
