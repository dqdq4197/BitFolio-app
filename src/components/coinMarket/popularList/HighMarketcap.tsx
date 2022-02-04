import React, { useState, useCallback } from 'react';
import { Animated, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import useLocales from '/hooks/useLocales';
import useRequest from '/hooks/useRequest';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import { CoinMarketReturn } from '/types/CoinGeckoReturnType';

import CustomRefreshControl from '/components/common/CustomRefreshControl';
import FlatListHeader from './FlatListHeader';
import Footer from './Footer';
import Item from './Item';

const HighMarketcap = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useGlobalTheme();
  const { currency } = useLocales();
  const [refreshing, setRefreshing] = useState(false);
  const { data, mutate } = useRequest<CoinMarketReturn[]>(
    CoinGecko.coin.markets({
      vs_currency: currency,
      per_page: 100,
    }),
    http,
    { suspense: true }
  );
  const { scrollY } = useAnimatedHeaderTitle({
    title: `${t(`common.market cap`)} Top 100`,
    triggerPoint: 30,
  });

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await mutate();
    setRefreshing(false);
  }, [mutate]);

  const handlePressItem = useCallback(
    (id: string, symbol: string) => {
      navigation.navigate('CoinDetail', {
        param: { id, symbol },
        screen: 'Overview',
      });
    },
    [navigation]
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      contentContainerStyle={{
        backgroundColor: theme.base.background.surface,
      }}
      renderItem={({ item, index }) => (
        <Item
          item={item}
          index={index}
          valueKey="market_cap"
          percentageKey="market_cap_change_percentage_24h"
          onPressItem={handlePressItem}
        />
      )}
      scrollEventThrottle={16}
      ListHeaderComponent={
        <FlatListHeader
          title={`${t(`common.market cap`)} Top 100`}
          description={
            t(`coinMarketHome.the market cap was calculated as the available cryptocurrency supply × the current cryptocurrency price. Take a look at coins with high market cap`)
          }
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
      getItemLayout={(_, index) => ({
        length: 60,
        offset: 60 * index,
        index,
      })}
    />
  );
};

export default HighMarketcap;
