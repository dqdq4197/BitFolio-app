import { useState, useCallback } from 'react'
import { Animated, FlatList } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

import useLocales from '@/hooks/use-locales'
import useRequest from '@/hooks/use-request'
import useAnimatedHeaderTitle from '@/hooks/use-animated-header-title'
import useGlobalTheme from '@/hooks/use-global-theme'
import { CoinGecko, http } from '@/lib/api/coin-gecko-client'
import { ORDER } from '@/lib/constants/coingecko'
import type { CoinMarketReturn } from '@/types/coin-gecko-return-type'
import type { HomeScreenProps } from '@/types/navigation'

import CustomRefreshControl from '@/components/common/custom-refresh-control'
import FlatListHeader from './flat-list-header'
import Item from './item'
import Footer from './footer'

const HighVolume = () => {
  const { t } = useTranslation()
  const navigation =
    useNavigation<HomeScreenProps<'CoinHighVolume'>['navigation']>()
  const { currency } = useLocales()
  const { theme } = useGlobalTheme()
  const [refreshing, setRefreshing] = useState(false)
  const { scrollY } = useAnimatedHeaderTitle({
    title: `${t(`common.volume`)} Top 100`,
    triggerPoint: 30,
  })
  const { data, mutate } = useRequest<CoinMarketReturn[]>(
    CoinGecko.coin.markets({
      vs_currency: currency,
      order: ORDER.VOLUME_DESC,
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

  if (!data) return <></>
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id + item.name}
      contentContainerStyle={{
        backgroundColor: theme.base.background.surface,
      }}
      renderItem={({ item, index }) => (
        <Item
          item={item}
          index={index}
          valueKey="total_volume"
          onPressItem={handlePressItem}
        />
      )}
      scrollEventThrottle={8}
      ListHeaderComponent={
        <FlatListHeader
          title={`${t(`common.volume`)} Top 100`}
          description={t(`coinMarketHome.popular list summary.high volume`)}
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
      getItemLayout={(_, index) => ({
        length: 60,
        offset: 60 * index,
        index,
      })}
    />
  )
}

export default HighVolume
