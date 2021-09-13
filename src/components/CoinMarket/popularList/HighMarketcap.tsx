import React, { useState, useCallback } from 'react';
import { Animated, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Item from './Item'
import useCoinMarketData from '/hooks/useCoinMarketData';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import useGlobalTheme from '/hooks/useGlobalTheme';
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import FlatListHeader from './FlatListHeader';
import Footer from './Footer';

const HighMarketcap = () => {
  const { theme } = useGlobalTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { data, mutate } = useCoinMarketData({ per_page: 100 });
  const { scrollY } = useAnimatedHeaderTitle({ title: '시가 총액 Top100', triggerPoint: 30 });
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
            title="시가 총액 Top100"
            description="시가 총액은 사용 가능한 암호화폐 공급량 × 현재 암호화폐 가격으로 계산되었어요. 시가 총액이 높은 코인들을 살펴보세요"
          />
        }
        ListFooterComponent={<Footer />}
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

export default HighMarketcap;