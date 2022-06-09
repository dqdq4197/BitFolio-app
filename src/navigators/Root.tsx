import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import type { RootStackParamList } from '/types/navigation';

import Main from './Main';
// import Setting from './Setting';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Main} />
        {/* <Stack.Screen
          name="Setting"
          component={Setting}
          options={{ presentation: 'modal', cardOverlayEnabled: true }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
