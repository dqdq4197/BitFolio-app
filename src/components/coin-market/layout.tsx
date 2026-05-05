import { useNavigation, useScrollToTop } from '@react-navigation/native'
import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, ScrollView } from 'react-native'

import useAnimatedHeaderTitle from '@/hooks/use-animated-header-title'
import type { HomeScreenProps } from '@/types/navigation'

import HighMarketCapPreview from './high-market-cap-preview'
import HighVolumePreview from './high-volume-preview'
import PopularList from './popular-list'
import RecentlyViewedList from './recently-viewed-list'
import TextMarquee from './text-marquee'
import WatchList from './watch-list'
import BottomNotice from '@/components/common/bottom-notice'
import CustomScrollView from '@/components/common/scroll-view'
import SurfaceWrap from '@/components/common/surface-wrap'

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
