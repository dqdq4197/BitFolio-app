import React, { useState, useCallback } from 'react';
import { Animated, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Item from './Item'
import useCoinMarketData from '/hooks/useCoinMarketData';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import useGlobalTheme from '/hooks/useGlobalTheme';
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import FlatListHeader from './FlatListHeader';


const NewCoin = () => {
  const { theme } = useGlobalTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { data, mutate } = useCoinMarketData({ per_page: 100 });
  const { scrollY } = useAnimatedHeaderTitle({ title: 'New Coins', triggerPoint: 30 });
  const navigation = useNavigation();

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    mutate()
      .then(() => {
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

  return (
    <>
      <FlatList 
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          backgroundColor: theme.base.background.surface,
        }}
        renderItem={
          ({ item, index }) => 
            <Item 
              item={item} 
              index={index}
              valueKey='market_cap'
              percentageKey='market_cap_change_percentage_24h'
              onPressItem={handlePressItem}
            />
        }
        scrollEventThrottle={16}
        ListHeaderComponent={
          <FlatListHeader
            title="새로운 암호화폐"
            description="지난 30일 동안 새롭게 추가된 코인을 살펴보세요"
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

export default NewCoin;
