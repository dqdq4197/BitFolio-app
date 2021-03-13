import React, { useRef, useState, useCallback } from 'react';
import { Animated, Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CoinMarketItem from './CoinMarketItem'
import useCoinMarketData from '/hooks/useCoinMarketData';
import MarketListHeader from './MarketListHeader';
import FlatListHeader from './FlatListHeader';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import CustomRefreshControl from '/components/common/CustomRefreshControl';


const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 30;

const CoinMarketList = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  let { data, size, setSize, mutate, isValidating } = useCoinMarketData({
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
    navigation.navigate('CoinMarketDetail', { id })
  }, [])

  return (
    <>
      <MarketListHeader 
        {...{ HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, scrollY } }
      />
      <FlatList 
        data={data?.flat()}
        keyExtractor={item => item.id + item.symbol}
        renderItem={({item, index}) => <CoinMarketItem item={item} index={index} onPressItem={handlePressItem}/>}
        scrollEventThrottle={16}
        style={{height: Dimensions.get('window').height}}
        contentContainerStyle={{backgroundColor: '#1B1B1B'}}
        ListHeaderComponent={isValidating ? FlatListHeader : <></>}
        ListFooterComponent={MarketListSkeleton}
        onScroll={Animated.event(
          [
            { nativeEvent: { contentOffset: { y: scrollY } } }
          ], 
          { useNativeDriver: false }
        )}
        refreshControl={
          <CustomRefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        }
        onEndReached={() => {
          setSize(size + 1)
        }}
        onEndReachedThreshold={0.5}
      />
    </>
  )
}

export default CoinMarketList;


