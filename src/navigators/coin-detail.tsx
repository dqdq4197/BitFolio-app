import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useEffect, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { CoinIdProvider } from '@/hooks/context/use-coin-id-context'
import useGlobalTheme from '@/hooks/use-global-theme'
import { useAppDispatch } from '@/hooks/use-redux'
import { changeRecentlyViewed } from '@/store/slices/base-setting'
import type {
  CoinDetailParamList,
  CoinDetailParams,
  HomeScreenProps,
} from '@/types/navigation'

import TabBar from '@/components/coin-market-detail/tab-bar'
import WatchListIcon from '@/components/common/watch-list-icon'
import {
  News,
  Overview,
  Profile,
  Transactions,
} from '@/screens/coin-market/detail'

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
    <CoinIdProvider value={{ id, symbol }}>
      <Tab.Navigator
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
  )
}

export default CoinDetail
