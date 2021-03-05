import React, { useRef, useState, useCallback } from 'react';
import { Animated, View, Dimensions, FlatList, Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CoinMarketItem from '/components/CoinMarket/CoinMarketItem'
import useCoinMarketData from '/hooks/useCoinMarketData';
import { TABBAR_HEIGHT } from '/lib/constant';
import MarketListHeader from './MarketListHeader';

const CoinMarketList = () => {
  const ref = useRef(null);
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
      <MarketListHeader/>
      <FlatList 
        data={data}
        keyExtractor={item => item.id +'asd'}
        renderItem={({item, index}) => <CoinMarketItem item={item} index={index} onPressItem={handlePressItem}/>}
        contentContainerStyle={Platform.OS === 'android' ? {paddingBottom: TABBAR_HEIGHT} : {}}
        scrollEventThrottle={16}
        ref={ref}
        style={{height: Dimensions.get('window').height}}
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
