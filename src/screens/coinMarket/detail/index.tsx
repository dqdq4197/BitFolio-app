import React, { createContext, useLayoutEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GeneralTemplate from '/components/GeneralTemplate';
import OverViewLayout from '/components/coinMarketDetail/overview/Layout';
import DiscussionLayout from '/components/coinMarketDetail/discussion/Layout';
import ProfileLayout from '/components/coinMarketDetail/profile/Layout';
import NewsLayout from '/components/coinMarketDetail/news/Layout';
import TabBar from '/components/coinMarketDetail/TabBar';
import useGlobalTheme from '/hooks/useGlobalTheme';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import { CoinIdProvider } from '/hooks/useCoinIdContext'

const Tab = createMaterialTopTabNavigator();

const DetailTab = ({ route, navigation }:any) => {
  const { param, screen } = route.params;
  const theme = useGlobalTheme();

  useLayoutEffect(() => {
    const { id } = param;
    navigation.setOptions({
      title: id.charAt(0).toUpperCase() + id.slice(1)
    })
  }, [])

  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<MarketListSkeleton/>} >
        <CoinIdProvider id={param.id}>
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
        </CoinIdProvider>
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default DetailTab;