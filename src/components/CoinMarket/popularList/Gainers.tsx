import React, { useState, useCallback } from 'react';
import { Animated, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Item from './Item'
import useCoinMarketData from '/hooks/useCoinMarketData';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import useGlobalTheme from '/hooks/useGlobalTheme';
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import FlatListHeader from './FlatListHeader';
import { ORDER } from '/lib/constant';


const Gainers = () => {
  const { theme } = useGlobalTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { data: usdData, mutate: usdMutate } = useCoinMarketData({ currency: 'usd', order: ORDER.HOUR_24_DESC, per_page: 250 });
  const { data, mutate } = useCoinMarketData({ order: ORDER.HOUR_24_DESC, per_page: 250 });
  const { scrollY } = useAnimatedHeaderTitle({ title: '24h 상승 종목', triggerPoint: 50 });
  const navigation = useNavigation();



  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      mutate(),
      usdMutate()
    ]).then(() => {
      setRefreshing(false);
    })
  }, []);

  const handlePressItem = useCallback((id:string) => {
    navigation.navigate('CoinDetail', { param: { id }, screen: 'Overview' })
  }, [])

  const handleScroll = Animated.event(
    [ { nativeEvent: { contentOffset: { y: scrollY } } } ], 
    { useNativeDriver: false }
  )
  
  if(!data || !usdData) return <></>
  return (
    <>
      <FlatList 
        data={usdData.filter(coin => coin.total_volume >= 50000 && coin.price_change_percentage_24h > 0)}
        keyExtractor={item => item.id + item.symbol}
        contentContainerStyle={{
          backgroundColor: theme.base.background.surface,
        }}
        renderItem={
          ({ item, index }) => {
            let nowItem = data.filter(coin => coin.id === item.id)[0]
            item.current_price = nowItem.current_price;
            return (
              <Item 
                item={item} 
                index={index}
                valueKey='current_price'
                percentageKey='price_change_percentage_24h'
                onPressItem={handlePressItem}
              />
            )
          }
        }
        scrollEventThrottle={16}
        ListHeaderComponent={
          <FlatListHeader
            title="24h 상승 종목"
            description="최근 24시간 동안 거래량이 US$50,000 이상인 암호화폐만 표시됩니다."
          />
        }
        onScroll={handleScroll}
        refreshControl={
          <CustomRefreshControl
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        }
      />
    </>
  )
}

export default Gainers;
