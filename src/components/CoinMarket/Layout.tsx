import React, { useCallback } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PopularList from './PopularList';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import ScrollView from "/components/common/ScrollView";
import SurfaceWrap from '/components/common/SurfaceWrap';
import RecentlyViewedList from "./RecentlyViewedList";
import HighPricePreview from './HighPricePreview';
import HighVolumePreview from './HighVolumePreview';
import Marquee from './Marquee';
import WatchList from './WatchList';


const Layout = () => {

  const navigation = useNavigation();
  const { scrollY } = useAnimatedHeaderTitle({ title: '시장 시세', triggerPoint: 40 });

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
      <SurfaceWrap isMain title="시장 시세" >
        {/* <Marquee delay={1000}/> */}
      </SurfaceWrap>
      <WatchList 
        onPressItem={handlePressItem}
      />
      <PopularList/>
      <RecentlyViewedList 
        onPressItem={handlePressItem}
      />
      <HighPricePreview 
        onPressItem={handlePressItem}
      />
      <HighVolumePreview 
        onPressItem={handlePressItem}
      />
    </ScrollView>
  )
}

export default Layout;