import React, { useState, useCallback } from 'react';
import { Animated, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useCoinMarketData from '/hooks/useCoinMarketData';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import useGlobalTheme from '/hooks/useGlobalTheme';
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import FlatListHeader from './FlatListHeader';
import Item from './Item'


const HighVolume = () => {
  const { theme } = useGlobalTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { data, mutate } = useCoinMarketData({ order: 'volume_desc', per_page: 100 });
  const { scrollY } = useAnimatedHeaderTitle({ title: '거래량 Top100', triggerPoint: 30 });
  const navigation = useNavigation();

  const handleRefresh = useCallback(async() => {
    setRefreshing(true);
    await mutate()
    setRefreshing(false);
  }, []);

  const handlePressItem = useCallback((id:string) => {
    navigation.navigate('CoinDetail', { param: { id }, screen: 'Overview' })
  }, [])

  const handleScroll = Animated.event(
    [ { nativeEvent: { contentOffset: { y: scrollY } } } ], 
    { useNativeDriver: false }
  )

  if(!data) return <></>
  return (
    <>
      <FlatList 
        data={data}
        keyExtractor={item => item.id + item.name}
        contentContainerStyle={{
          backgroundColor: theme.base.background.surface,
        }}
        renderItem={
          ({ item, index }) => 
            <Item 
              item={ item } 
              index={ index }
              valueKey='total_volume'
              onPressItem={handlePressItem}
            />
        }
        scrollEventThrottle={8}
        ListHeaderComponent={
          <FlatListHeader
            title="거래량 Top100"
            description="24시간 동안 모든 ​​거래 쌍의 총거래량입니다. 가장 거래가 많았던 코인들을 살펴보세요"
          />
        }
        
        onScroll={handleScroll}
        refreshControl={
          <CustomRefreshControl
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        }
        getItemLayout={(data, index) => (
          {length: 60, offset: 60 * index, index}
        )}
      />
    </>
  )
}

export default HighVolume;
