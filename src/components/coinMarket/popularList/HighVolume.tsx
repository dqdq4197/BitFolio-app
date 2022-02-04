import React, { useState, useCallback } from 'react';
import { Animated, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import useLocales from '/hooks/useLocales';
import useRequest from '/hooks/useRequest';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import { ORDER } from '/lib/constant';
import { CoinMarketReturn } from '/types/CoinGeckoReturnType';

import CustomRefreshControl from '/components/common/CustomRefreshControl';
import FlatListHeader from './FlatListHeader';
import Item from './Item';
import Footer from './Footer';

const HighVolume = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { currency } = useLocales();
  const { theme } = useGlobalTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { scrollY } = useAnimatedHeaderTitle({
    title: `${t(`common.volume`)} Top 100`,
    triggerPoint: 30,
  });
  const { data, mutate } = useRequest<CoinMarketReturn[]>(
    CoinGecko.coin.markets({
      vs_currency: currency,
      order: ORDER.VOLUME_DESC,
      per_page: 100,
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
  )

  if (!data) return <></>;
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id + item.name}
      contentContainerStyle={{
        backgroundColor: theme.base.background.surface,
      }}
      renderItem={({ item, index }) => (
        <Item
          item={item}
          index={index}
          valueKey="total_volume"
          onPressItem={handlePressItem}
        />
      )}
      scrollEventThrottle={8}
      ListHeaderComponent={
        <FlatListHeader
          title={`${t(`common.volume`)} Top 100`}
          description={
            t(`coinMarketHome.total volume of all trading pairs over a 24-hour period. Take a look at the most traded coins`)
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

export default HighVolume;
