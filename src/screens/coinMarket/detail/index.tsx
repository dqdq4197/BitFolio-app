import React, { Suspense, createContext, useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GeneralTemplate from '/components/GeneralTemplate';
import OverViewLayout from '/components/coinMarketDetail/overview/Layout';
import DiscussionLayout from '/components/coinMarketDetail/discussion/Layout';
import ProfileLayout from '/components/coinMarketDetail/profile/Layout';
import NewsLayout from '/components/coinMarketDetail/news/Layout';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import TabBar from '/components/coinMarketDetail/TabBar';
import useGlobalTheme from '/hooks/useGlobalTheme';

const Tab = createMaterialTopTabNavigator();
export const CoinIdContext = createContext<string | undefined>(undefined);

const DetailTab = ({ route, navigation }:any) => {
  const { param, screen } = route.params;
  const theme = useGlobalTheme();

  useLayoutEffect(() => {
    const { id } = param;
    navigation.setOptions({
      title: id.charAt(0).toUpperCase() + id.slice(1)
    })
  }, [])

  function ErrorFallback({error, resetErrorBoundary}:FallbackProps) {
    return (
      <View style={{ flex: 1}}>
        <Text>Something went wrong:</Text>
        <Text>{error.message}</Text>
      </View>
    )
  }

  function SuspenseFallback() {
    return (
      <View style={{ flex: 1}}>
        <Text style={{color:'white', flex: 1, alignItems:'center', justifyContent: 'center'}}>Loading..</Text>
      </View>
    )
  } 

  return (
    <GeneralTemplate>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense 
          fallback={<SuspenseFallback/>}
        >
          <CoinIdContext.Provider value={param.id}>
            <Tab.Navigator 
              sceneContainerStyle={{
                backgroundColor: theme.base.background[100]
              }}
              tabBar={(props) => <TabBar {...props} />} 
              initialRouteName={screen}
            >
              <Tab.Screen name="Overview" component={OverViewLayout} />
              <Tab.Screen name="Profile" component={ProfileLayout} />
              <Tab.Screen name="News" component={NewsLayout} />
              <Tab.Screen name="Notice" component={DiscussionLayout} />
              <Tab.Screen name="Discussion" component={DiscussionLayout} />
            </Tab.Navigator>
          </CoinIdContext.Provider>
        </Suspense>
      </ErrorBoundary>
    </GeneralTemplate>
  )
}

export default DetailTab;