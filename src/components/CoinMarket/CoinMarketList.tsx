import React, { useRef, useState, useCallback } from 'react';
import { Animated, Dimensions, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CoinMarketItem from '/components/CoinMarket/CoinMarketItem'
import useCoinMarketData from '/hooks/useCoinMarketData';
import MarketListHeader from './MarketListHeader';

const HEADER_MAX_HEIGHT = 240;
const HEADER_MIN_HEIGHT = 150;

const CoinMarketList = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);

  let { data, size, setSize, mutate } = useCoinMarketData({
    vs_currency: 'krw',
    per_page: 20,
    order: 'market_cap_rank'
  });

  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    mutate()
      .then(() => {
        setRefreshing(false);
      })
  }, []);

  const handlePressItem = useCallback((id:string) => {
    navigation.navigate('CoinMarketDetail', {id})
  }, [])

  return (
    <>
      <MarketListHeader 
        {...{ HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, scrollY } }
      />
      
      <FlatList 
        data={data?.flat()}
        keyExtractor={item => item.id +'asd'}
        renderItem={({item, index}) => <CoinMarketItem item={item} index={index} onPressItem={handlePressItem}/>}
        contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT - 32}}
        scrollEventThrottle={16}
        style={{height: Dimensions.get('window').height}}
        onScroll={Animated.event(
          [
            { nativeEvent: { contentOffset: { y: scrollY } } }
          ], 
          { useNativeDriver: false }
        )}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        }
        onEndReached={() => {
          setSize(size + 1)
        }}
      />
    
    </>
  )
}

export default CoinMarketList;


