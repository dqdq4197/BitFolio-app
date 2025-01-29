import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, { useEffect, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { CoinIdProvider } from '/hooks/context/useCoinIdContext'
import useGlobalTheme from '/hooks/useGlobalTheme'
import { useAppDispatch } from '/hooks/useRedux'
import { changeRecentlyViewed } from '/store/slices/baseSetting'
import type {
  CoinDetailParamList,
  CoinDetailParams,
  HomeScreenProps,
} from '/types/navigation'

import TabBar from '/components/coinMarketDetail/TabBar'
import WatchListIcon from '/components/common/WatchListIcon'
import GeneralTemplate from '/components/GeneralTemplate'
import {
  News,
  Overview,
  Profile,
  Transactions,
} from '/screens/coinMarket/detail'

const Tab = createMaterialTopTabNavigator<CoinDetailParamList>()

const CoinDetail = ({ route, navigation }: HomeScreenProps<'CoinDetail'>) => {
  const { t } = useTranslation()
  const { params, screen } = route.params
  const { id, symbol } = params as CoinDetailParams
  const { theme } = useGlobalTheme()
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: symbol
        ? symbol.toUpperCase()
        : id.charAt(0).toUpperCase() + id.slice(1),
      headerRight: () => <WatchListIcon id={id} />,
    })
  }, [id, navigation, symbol, theme])

  useEffect(() => {
    dispatch(changeRecentlyViewed(id))
  }, [dispatch, id])

  return (
    <GeneralTemplate>
      <CoinIdProvider value={{ id, symbol }}>
        <Tab.Navigator
          sceneContainerStyle={{
            backgroundColor: theme.base.background[100],
          }}
          tabBar={props => <TabBar {...props} />}
          initialRouteName={screen || 'Overview'}
        >
          <Tab.Screen
            name="Overview"
            options={{ tabBarLabel: t('coinDetail.overview') }}
            component={Overview}
          />
          <Tab.Screen
            name="Profile"
            options={{ tabBarLabel: t('coinDetail.profile') }}
            component={Profile}
          />
          <Tab.Screen
            name="News"
            options={{ tabBarLabel: t('coinDetail.news') }}
            component={News}
          />
          <Tab.Screen
            name="Transactions"
            options={{ tabBarLabel: t('coinDetail.transactions') }}
            component={Transactions}
          />
          {/* <Tab.Screen
            name="Notice"
            options={{ tabBarLabel: t('coinDetail.notice') }}
            component={Notice}
          />
          <Tab.Screen
            name="Discussion"
            options={{ tabBarLabel: t('coinDetail.discussion') }}
            component={Discussion}
          /> */}
        </Tab.Navigator>
      </CoinIdProvider>
    </GeneralTemplate>
  )
}

export default CoinDetail
