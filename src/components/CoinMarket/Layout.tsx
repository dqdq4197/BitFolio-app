import React, { useCallback } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import PopularList from './PopularList';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import ScrollView from "/components/common/ScrollView";
import SurfaceWrap from '/components/common/SurfaceWrap';
import RecentlyViewedList from "./RecentlyViewedList";
import HighMarketCapPreview from './HighMarketCapPreview';
import HighVolumePreview from './HighVolumePreview';
import WatchList from './WatchList';
import TextMarquee from './TextMarquee';
import BottomNotice from '/components/common/BottomNotice';

const Layout = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { scrollY } = useAnimatedHeaderTitle({ title: t('coinMarketHome.market'), triggerPoint: 30 });

  const handlePressItem = useCallback((id:string, symbol: string) => {
    navigation.navigate('CoinDetail', { param: { id, symbol }, screen: 'Overview' })
  }, [])

  const handleScroll = Animated.event(
    [ { nativeEvent: { contentOffset: { y: scrollY } } } ], 
    { useNativeDriver: false }
  )
    
  return (
    <ScrollView 
      onScroll={handleScroll}
      scrollEventThrottle={ 16 }
    > 
      <SurfaceWrap 
        title={t('coinMarketHome.market')} 
        fontXL 
        marginTopZero
        marginBottomZero
      >
        <TextMarquee />
      </SurfaceWrap>
      <WatchList 
        onPressItem={handlePressItem}
      />
      <PopularList/>
      <RecentlyViewedList 
        onPressItem={handlePressItem}
      />
      <HighMarketCapPreview 
        onPressItem={handlePressItem}
      />
      <HighVolumePreview 
        onPressItem={handlePressItem}
      />
      <BottomNotice />
    </ScrollView>
  )
}

export default Layout;