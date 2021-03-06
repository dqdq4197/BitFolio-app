import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import HomeScreen from './HomeScreen';
import EditorScreen from './EditorScreen';


type RootStackParamList = {
  DiscusionHome: undefined;
  Editor: undefined;
};

const Stack = createStackNavigator<RootStackParamList>()
const { width } = Dimensions.get("window");

const News = () => {
  const { theme } = useGlobalTheme();

  const NavigationOptions = (title?: string) => {
    return {
      title,
      headerStyle: {
        backgroundColor: theme.base.background.surface,
        shadowColor: 'transparent', // theme.base.background[300]
      },
      headerTintColor: theme.base.text[100],
      headerRight: () => (
        <Ionicons name="md-settings-outline" size={24} color="white" />
      ),
      headerBackTitleVisible: false,
      headerLeftContainerStyle: {
        paddingLeft: 10,
      },
      headerRightContainerStyle: {
        paddingRight: 16
      },
      headerTitleStyle: {
        fontSize: 20
      },
      gestureResponseDistance: {
        horizontal: width
      },
    }
  }
  
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="DiscusionHome" 
        component={HomeScreen}
        options={NavigationOptions('List')}
      />
      <Stack.Screen 
        name="Editor" 
        component={EditorScreen}
        options={NavigationOptions('Editor')}
      />
    </Stack.Navigator>
  )
}

export default News;