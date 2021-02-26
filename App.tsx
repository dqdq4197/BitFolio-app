import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native-appearance';
import { Home } from '/screens'; 
import { darkTheme, lightTheme } from '/lib/themeColor';
import { ThemeProvider } from 'styled-components';

const Stack = createStackNavigator();


const Detail = () => {
  return (
    <>
    </>
  )
}
//FlatList
export default function App() {

  const scheme = useColorScheme();

  return (
    <ThemeProvider 
      theme={scheme === 'dark' ? darkTheme : lightTheme}
    >
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            headerMode='none'
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Detail" component={Detail} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

