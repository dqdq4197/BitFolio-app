import { useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { Animated, FlatList, View } from 'react-native'

import useAnimatedHeaderTitle from '@/hooks/use-animated-header-title'
import useGlobalTheme from '@/hooks/use-global-theme'
import useLocales from '@/hooks/use-locales'
import useRequestInfinite from '@/hooks/use-request-infinite'
import { CoinGecko, http } from '@/lib/api/coin-gecko-client'
import type { CoinMarketReturn } from '@/types/coin-gecko-return-type'
import type { HomeScreenProps } from '@/types/navigation'

import Item from './item'
import PopularList from './popular-list'
import CustomRefreshControl from '@/components/common/custom-refresh-control'
import MarketListSkeleton from '@/components/skeleton-placeholder/market-list-skeleton'

/**
 * @deprecated
 */
const CoinMarketList = () => {
  const { theme } = useGlobalTheme()
  const navigation =
    useNavigation<HomeScreenProps<'CoinMarketHome'>['navigation']>()
  const { currency } = useLocales()
  const [refreshing, setRefreshing] = useState(false)
  const { scrollY } = useAnimatedHeaderTitle({ triggerPoint: 30 })

  // api 콜 보정(검수) 필요
  const { data, size, setSize, mutate } = useRequestInfinite<
    CoinMarketReturn[]
  >(
    (pageIndex: number) =>
      CoinGecko.coin.markets({
        vs_currency: currency,
        page: pageIndex + 1,
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
    (id: string) => {
      navigation.navigate('CoinDetail', {
        params: { id, symbol: '??' },
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
    <>
      <PopularList />
      <View>
        <FlatList
          data={data?.flat()}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            backgroundColor: theme.base.background.surface,
          }}
          renderItem={({ item }) => (
            <Item item={item} onPressItem={handlePressItem} />
          )}
          scrollEventThrottle={16}
          ListFooterComponent={MarketListSkeleton}
          // ListHeaderComponent={<FlatListHeader/>}
          // stickyHeaderIndices={[0]}
          onScroll={handleScroll}
          refreshControl={
            <CustomRefreshControl
              onRefresh={handleRefresh}
              refreshing={refreshing}
            />
          }
          onEndReached={() => setSize(size + 1)}
          onEndReachedThreshold={0.5}
        />
      </View>
    </>
  )
}

export default CoinMarketList
