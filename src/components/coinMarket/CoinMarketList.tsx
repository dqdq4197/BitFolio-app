import React, { useState, useCallback } from 'react';
import { Animated, FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useRequestInfinite from '/hooks/useRequestInfinite';
import useLocales from '/hooks/useLocales';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import { CoinMarketReturn } from '/types/CoinGeckoReturnType';

import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import PopularList from './PopularList';
import Item from './Item';

const CoinMarketList = () => {
  const { theme } = useGlobalTheme();
  const navigation = useNavigation();
  const { currency } = useLocales();
  const [refreshing, setRefreshing] = useState(false);
  const { scrollY } = useAnimatedHeaderTitle({ triggerPoint: 30 });

  // api 콜 보정(검수) 필요
  const { data, size, setSize, mutate } = useRequestInfinite<
    CoinMarketReturn[]
  >(
    (pageIndex: number) =>
      CoinGecko.coin.markets({
        vs_currency: currency,
        page: pageIndex + 1,
      }),
    http,
    { suspense: true }
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await mutate();
    setRefreshing(false);
  }, [mutate]);

  const handlePressItem = useCallback(
    (id: string) => {
      navigation.navigate('CoinDetail', { param: { id }, screen: 'Overview' });
    },
    [navigation]
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  return (
    <>
      <PopularList />
      <View>
        <FlatList
          data={data?.flat()}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            backgroundColor: theme.base.background.surface,
          }}
          renderItem={({ item }) => (
            <Item item={item} onPressItem={handlePressItem} />
          )}
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
    </>
  );
};

export default CoinMarketList;
