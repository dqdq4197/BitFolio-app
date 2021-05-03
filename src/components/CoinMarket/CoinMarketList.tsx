import React, { useRef, useState, useCallback } from 'react';
import { Animated, View, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CoinMarketItem from './CoinMarketItem'
import useCoinMarketData from '/hooks/useCoinMarketData';
import MarketListHeader from './MarketListHeader';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import FlatListHeader from './FlatListHeader';


const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 30;

const CoinMarketList = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  let { data, size, setSize, mutate } = useCoinMarketData({});

  const navigation = useNavigation();

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    mutate()
      .then(() => {
        setRefreshing(false);
      })
  }, []);

  const handlePressItem = useCallback((id:string) => {
    navigation.navigate('CoinMarketDetail', {param: { id }, screen: 'Overview'})
  }, [])

  return (
    <>
      {/* <MarketListHeader/> */}
      <FlatList 
        data={data?.flat()}
        keyExtractor={item => item.id + item.symbol}
        renderItem={({item, index}) => <CoinMarketItem item={item} index={index} onPressItem={handlePressItem}/>}
        scrollEventThrottle={16}
        contentContainerStyle={{backgroundColor: '#1B1B1B'}}
        ListFooterComponent={MarketListSkeleton}
        // ListHeaderComponent={<FlatListHeader/>}
        // stickyHeaderIndices={[0]}
        onScroll={Animated.event(
          [
            { nativeEvent: { contentOffset: { y: scrollY } } }
          ], 
          { useNativeDriver: false }
        )}
        refreshControl={
          <CustomRefreshControl
            onRefresh={handleRefresh}
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
