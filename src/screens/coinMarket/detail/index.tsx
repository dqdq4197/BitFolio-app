import React, { useLayoutEffect, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTranslation } from 'react-i18next';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { CoinIdProvider } from '/hooks/useCoinIdContext'
import { useAppDispatch } from '/hooks/useRedux';
import { changeRecentlyViewed } from '/store/baseSetting';
import WatchListIcon from '/components/common/WatchListIcon';
import GeneralTemplate from '/components/GeneralTemplate';
import TabBar from '/components/coinMarketDetail/TabBar';
import Image from '/components/common/Image';
import Overview from './Overview';
import Profile from './Profile';
import News from './News';
import Transactions from './Transactions'


const Tab = createMaterialTopTabNavigator();

const DetailTab = ({ route, navigation }:any) => {

  const { t } = useTranslation();
  const { param, screen } = route.params;
  const { theme } = useGlobalTheme();
  const dispatch = useAppDispatch();
  
  useLayoutEffect(() => {
    const { id, symbol } = param;
    
    navigation.setOptions({
      title: symbol ? symbol.toUpperCase() : (id.charAt(0).toUpperCase() + id.slice(1)),
      headerTitleStyle: {
        fontSize: parseInt(theme.size.font_l),
        fontWeight: 'bold',
      },
      headerRight: () => (
        <WatchListIcon id={id} size={28}/>
      ),
    })
  }, [])

  useEffect(() => {
    dispatch(changeRecentlyViewed(param.id));
  }, [])

  return (
    <GeneralTemplate>
      <CoinIdProvider value={{ id: param.id, symbol: param.symbol }}>
        <Tab.Navigator 
          sceneContainerStyle={{
            backgroundColor: theme.base.background[100]
          }}
          tabBar={(props) => <TabBar {...props} />} 
          initialRouteName={screen}
        >
          <Tab.Screen name={t('coinDetail.overview')} component={Overview} />
          <Tab.Screen name={t('coinDetail.profile')} component={Profile} />
          <Tab.Screen name={t('coinDetail.news')} component={News} />
          <Tab.Screen name={t('coinDetail.transactions')} component={Transactions} />
          {/* <Tab.Screen name={t('coinDetail.notice')} component={Notice} />
          <Tab.Screen name={t('coinDetail.discussion')} component={Discussion} /> */}
        </Tab.Navigator>
      </CoinIdProvider>
    </GeneralTemplate>
  )
}

export default DetailTab;