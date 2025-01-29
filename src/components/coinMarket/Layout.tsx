import { useNavigation, useScrollToTop } from '@react-navigation/native'
import React, { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, ScrollView } from 'react-native'

import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle'
import type { HomeScreenProps } from '/types/navigation'

import HighMarketCapPreview from './HighMarketCapPreview'
import HighVolumePreview from './HighVolumePreview'
import PopularList from './PopularList'
import RecentlyViewedList from './RecentlyViewedList'
import TextMarquee from './TextMarquee'
import WatchList from './WatchList'
import BottomNotice from '/components/common/BottomNotice'
import CustomScrollView from '/components/common/ScrollView'
import SurfaceWrap from '/components/common/SurfaceWrap'

const Layout = () => {
  const { t } = useTranslation()
  const navigation =
    useNavigation<HomeScreenProps<'CoinMarketHome'>['navigation']>()
  const scrollViewRef = useRef<ScrollView>(null)
  const { scrollY } = useAnimatedHeaderTitle({
    title: t('coinMarketHome.market'),
    triggerPoint: 30,
  })

  useScrollToTop(scrollViewRef)

  const handlePressItem = useCallback(
    (id: string, symbol: string) => {
      navigation.navigate('CoinDetail', {
        screen: 'Overview',
        params: { id, symbol },
      })
    },
    [navigation]
  )

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  )

  return (
    <CustomScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <SurfaceWrap
        title={t('coinMarketHome.market')}
        fontXL
        marginTopZero
        marginBottomZero
      >
        <TextMarquee />
      </SurfaceWrap>
      <WatchList onPressItem={handlePressItem} />
      <PopularList />
      <RecentlyViewedList onPressItem={handlePressItem} />
      <HighMarketCapPreview onPressItem={handlePressItem} />
      <HighVolumePreview onPressItem={handlePressItem} />
      <BottomNotice />
    </CustomScrollView>
  )
}

export default Layout
