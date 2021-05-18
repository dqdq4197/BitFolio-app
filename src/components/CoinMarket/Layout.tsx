import React, { useCallback } from 'react';
import { Animated, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import PopularList from './PopularList';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import ScrollView from "/components/common/ScrollView";
import SurfaceWrap from '/components/common/SurfaceWrap';
import RecentlyViewedList from "./RecentlyViewedList";
import HighPricePreview from './HighPricePreview';
import HighVolumePreview from './HighVolumePreview';
import WatchList from './WatchList';


import Text from '/components/common/Text';
import { useAppDispatch } from '/hooks/useRedux';
import { changeCurrency, changeTheme } from '/store/baseSetting';
import useLocales from '/hooks/useLocales';
import useGlobalTheme from '/hooks/useGlobalTheme';


const Layout = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { scrollY } = useAnimatedHeaderTitle({ title: t('coinMarketHome.market'), triggerPoint: 40 });
  const { currency } = useLocales();
  const { scheme } = useGlobalTheme();

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
      <SurfaceWrap isMain title={t('coinMarketHome.market')} >
        {/* <Marquee delay={1000}/> */}
        <TouchableHighlight onPress={() => dispatch(changeCurrency(currency === 'usd' ? 'krw' : 'usd')) } > 
          <Text> change currency </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => dispatch(changeTheme(scheme === 'dark' ? 'light' : 'dark')) } > 
          <Text> change currency </Text>
        </TouchableHighlight>
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