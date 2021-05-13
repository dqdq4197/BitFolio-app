import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import useNewsCategories from '/hooks/useNewsCategories';
import { useCoinIdContext } from '/hooks/useCoinIdContext';
import useNewsArticles from '/hooks/useNewsArticles';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Header from './Header';
import Item from './Item';

const Layout = () => {
  const theme = useGlobalTheme();
  const { id, symbol } = useCoinIdContext();
  const { data: categories } = useNewsCategories({});
  const [category, setCategory] = useState('altcoin');
  const { data } = useNewsArticles({ categories: category });

  useEffect(() => {
    if(categories) {
      for(let i = 0; i < categories?.length; i++) {
        if(categories[i].categoryName.toLowerCase() === symbol) {
          setCategory(symbol);
          break;
        }
      }
    }
  }, [])

  if(!data) return <></>
  // console.log(data);
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
        ListHeaderComponent={<Header />}
        // stickyHeaderIndices={[0]}
        // onScroll={handleScroll}
        // refreshControl={
        //   <CustomRefreshControl
        //     onRefresh={handleRefresh}
        //     refreshing={refreshing}
        //   />
        // }
        // onEndReached={() => setSize(size + 1)}
        // onEndReachedThreshold={0.5}
      />
    </>
  )
}

export default Layout;