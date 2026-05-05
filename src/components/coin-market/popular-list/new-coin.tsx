import { useState, useCallback } from 'react'
import { Animated, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import useRequest from '@/hooks/use-request'
import useLocales from '@/hooks/use-locales'
import useAnimatedHeaderTitle from '@/hooks/use-animated-header-title'
import useGlobalTheme from '@/hooks/use-global-theme'
import { CoinGecko, http } from '@/lib/api/coin-gecko-client'
import type { CoinMarketReturn } from '@/types/coin-gecko-return-type'
import type { HomeScreenProps } from '@/types/navigation'

import CustomRefreshControl from '@/components/common/custom-refresh-control'
import FlatListHeader from './flat-list-header'
import Item from './item'
import Footer from './footer'

const NewCoin = () => {
  const { theme } = useGlobalTheme()
  const { currency } = useLocales()
  const [refreshing, setRefreshing] = useState(false)
  const { scrollY } = useAnimatedHeaderTitle({
    title: 'New Coins',
    triggerPoint: 30,
  })
  const navigation = useNavigation<HomeScreenProps<'NewCoin'>['navigation']>()
  const { data, mutate } = useRequest<CoinMarketReturn[]>(
    CoinGecko.coin.markets({
      vs_currency: currency,
      per_page: 100,
    }),
    http,
    { suspense: true }
  )

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await mutate()
    setRefreshing(false)
  }, [mutate])

  const handlePressItem = useCallback(
    (id: string, symbol: string) => {
      navigation.navigate('CoinDetail', {
        params: { id, symbol },
        screen: 'Overview',
      })
    },
    [navigation]
  )

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  )

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      contentContainerStyle={{
        backgroundColor: theme.base.background.surface,
      }}
      renderItem={({ item, index }) => (
        <Item
          item={item}
          index={index}
          valueKey="market_cap"
          percentageKey="market_cap_change_percentage_24h"
          onPressItem={handlePressItem}
        />
      )}
      scrollEventThrottle={16}
      ListHeaderComponent={
        <FlatListHeader
          title="새로운 암호화폐"
          description="지난 30일 동안 새롭게 추가된 코인을 살펴보세요"
        />
      }
      ListFooterComponent={<Footer />}
      onScroll={handleScroll}
      refreshControl={
        <CustomRefreshControl
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      }
      initialNumToRender={15}
      getItemLayout={(_data, index) => ({
        length: 60,
        offset: 60 * index,
        index,
      })}
    />
  )
}

export default NewCoin
