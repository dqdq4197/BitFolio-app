import React, { useCallback } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PopularList from './PopularList';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import ScrollView from "/components/common/ScrollView";
import SurfaceWrap from '/components/common/SurfaceWrap';
import RecentlyViewedList from "./RecentlyViewedList";
import HighMarketCapPreview from './HighMarketCapPreview';
import HighVolumePreview from './HighVolumePreview';

const Layout = () => {

  const navigation = useNavigation();
  const { scrollY } = useAnimatedHeaderTitle({ title: '시장 시세', triggerPoint: 40 });


  const handlePressItem = useCallback((id:string) => {
    navigation.navigate('CoinDetail', { param: { id }, screen: 'Overview' })
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
      <SurfaceWrap isMain title="시장 시세" />
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
    </ScrollView>
  )
}

export default Layout;