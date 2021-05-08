import React, { useState, useCallback } from 'react';
import { Animated, FlatList, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import Item from './Item'
import useCoinMarketData from '/hooks/useCoinMarketData';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import useGlobalTheme from '/hooks/useGlobalTheme';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import PopularList from './PopularList';

const HEADER_HEIGHT = 100;

const CoinMarketList = () => {
  const navHeaderHeight = useHeaderHeight();
  const theme = useGlobalTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { data, size, setSize, mutate } = useCoinMarketData({});
  const { scrollY } = useAnimatedHeaderTitle({ triggerPoint: 30 });
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
      {/* <ScrollView> */}
        <PopularList />
        <View>
          <FlatList 
            data={data?.flat()}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              backgroundColor: theme.base.background.surface,
            }}
            renderItem={
              ({ item }) => 
                <Item 
                  item={item} 
                  onPressItem={handlePressItem}
                />
            }
            scrollEventThrottle={16}
            ListFooterComponent={MarketListSkeleton}
            // ListHeaderComponent={<FlatListHeader/>}
            // stickyHeaderIndices={[0]}
            onScroll={handleScroll}
            refreshControl={
              <CustomRefreshControl
                onRefresh={handleRefresh}
                refreshing={refreshing}
              />
            }
            onEndReached={() => setSize(size + 1)}
            onEndReachedThreshold={0.5}
          />
        </View>
      {/* </ScrollView> */}
    </>
  )
}

export default CoinMarketList;
