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

const Losers = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { currency } = useLocales();
  const { theme } = useGlobalTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { scrollY } = useAnimatedHeaderTitle({ 
    title: t(`coinMarketHome.losers`), 
    triggerPoint: 30 
  });

  const { data: usdData, mutate: usdMutate } = useRequest<CoinMarketReturn[]>(
    CoinGecko.coin.markets({
      vs_currency: 'usd',
      order: ORDER.HOUR_24_ASC,
      per_page: 250
    }),
    http,
    { suspense: true }
  );
  const { data, mutate } = useRequest<CoinMarketReturn[]>(
    CoinGecko.coin.markets({
      vs_currency: currency,
      order: ORDER.HOUR_24_ASC,
      per_page: 250
    }),
    http,
    { suspense: true }
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      mutate(),
      usdMutate()
    ]).then(() => {
      setRefreshing(false);
    })
  }, []);

  const handlePressItem = useCallback((id:string, symbol: string) => {
    navigation.navigate('CoinDetail', { param: { id, symbol }, screen: 'Overview' })
  }, [])

  const handleScroll = Animated.event(
    [ { nativeEvent: { contentOffset: { y: scrollY } } } ], 
    { useNativeDriver: false }
  )
  
  if(!data || !usdData) return <></>
  return (
    <>
      <FlatList 
        data={usdData.filter(coin => coin.price_change_percentage_24h && coin.total_volume >= 50000 && coin.price_change_percentage_24h < 0)}
        keyExtractor={item => item.id + item.symbol}
        contentContainerStyle={{
          backgroundColor: theme.base.background.surface,
        }}
        renderItem={
          ({ item, index }) => {
            let nowItem = data.filter(coin => coin.id === item.id)[0]

            if(!nowItem) return <></>
            return (
              <Item 
                item={{
                  ...item,
                  current_price: nowItem.current_price
                }} 
                index={index}
                valueKey='current_price'
                percentageKey='price_change_percentage_24h'
                onPressItem={handlePressItem}
              />
            )
          }
        }
        scrollEventThrottle={16}
        ListHeaderComponent={
          <FlatListHeader
            title={ t(`coinMarketHome.losers`) }
            description={ 
              t(`coinMarketHome.only cryptocurrencies with trading volume greater than US$50,000 in the last 24 hours are displayed.`) 
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
        getItemLayout={(data, index) => (
          {length: 60, offset: 60 * index, index}
        )}
      />
    </>
  )
}

export default Losers;
