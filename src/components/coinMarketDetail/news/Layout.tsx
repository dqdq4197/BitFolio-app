import React, { useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import useNewsCategories from '/hooks/useNewsCategories';
import { useCoinIdContext } from '/hooks/useCoinIdContext';
import useNewsArticles from '/hooks/useNewsArticles';
import useGlobalTheme from '/hooks/useGlobalTheme';
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import Header from './Header';
import Item from './Item';

const Layout = () => {
  const { theme } = useGlobalTheme();
  const { symbol } = useCoinIdContext();
  const { data: categories } = useNewsCategories({});
  const [category, setCategory] = useState<string | null>(null);
  const { data, mutate } = useNewsArticles({ 
    categories: category ?? '',
    willNotRequest: category === null
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let isContain = false;
    if(categories) {
      for(let i = 0; i < categories?.length; i++) {
        if(categories[i].categoryName.toLowerCase() === symbol) {
          isContain = true;
          setCategory(symbol);
          break;
        }
      }
      if(!isContain) {
        setCategory('altcoin')
      }
    }
  }, [categories])

  const handleRefresh = useCallback(async() => {
    setRefreshing(true);
    await mutate()
    setRefreshing(false);
  }, []);

  if(!data) return <></>
  
  return (
    <>
      <FlatList 
        data={data[0].Data}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          backgroundColor: theme.base.background.surface,
        }}
        renderItem={
          ({ item }) => 
            <Item 
              item={item} 
              currentCategory={category}
            />
        }
        scrollEventThrottle={16}
        ListHeaderComponent={Header}
        refreshControl={
          <CustomRefreshControl
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        }
      />
    </>
  )
}

export default Layout;