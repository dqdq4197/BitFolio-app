import React, { useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';

import { useCoinIdContext } from '/hooks/context/useCoinIdContext';
import useNewsArticles from '/hooks/data/useNewsArticles';
import useGlobalTheme from '/hooks/useGlobalTheme';
import useRequest from '/hooks/useRequest';
import { Cryptocompare, http } from '/lib/api/CryptocompareClient';
import type { CategoryReturn } from '/types/cryptoCompareReturnType';

import CustomRefreshControl from '/components/common/CustomRefreshControl';
import Header from './Header';
import Item from './Item';

const Layout = () => {
  const { theme } = useGlobalTheme();
  const { symbol } = useCoinIdContext();
  const [category, setCategory] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { data, mutate } = useNewsArticles({
    categories: category ?? '',
    willNotRequest: category === null,
  });
  const { data: categories } = useRequest<CategoryReturn[]>(
    Cryptocompare.news.categories({}),
    http,
    { suspense: true }
  );

  useEffect(() => {
    let isContain = false;
    if (categories) {
      for (let i = 0; i < categories?.length; i += 1) {
        if (categories[i].categoryName.toLowerCase() === symbol) {
          isContain = true;
          setCategory(symbol);
          break;
        }
      }
      if (!isContain) {
        setCategory('altcoin');
      }
    }
  }, [categories, symbol]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await mutate();
    setRefreshing(false);
  }, [mutate]);

  if (!data) return <></>;

  return (
    <FlatList
      data={data[0].Data}
      keyExtractor={item => item.id}
      contentContainerStyle={{
        backgroundColor: theme.base.background.surface,
      }}
      renderItem={({ item }) => <Item item={item} currentCategory={category} />}
      scrollEventThrottle={16}
      ListHeaderComponent={Header}
      refreshControl={
        <CustomRefreshControl
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      }
    />
  );
};

export default Layout;
