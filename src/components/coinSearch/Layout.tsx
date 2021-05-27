import React, { useState } from 'react';
import { FlatList, Platform } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import useGlobalTheme from '/hooks/useGlobalTheme';
import EmptyView from './EmptyView';
import DefaultView from './DefaultView';
import SearchBar from './SearchBar';
import { SearchCoin } from '/lib/api/CoinGeckoReturnType';
import useSearchData from '/hooks/useSearchData';
import useSearchTranding from '/hooks/useSearchTranding';
import { useAppDispatch } from '/hooks/useRedux'
import Item from './Item';
import { changeRecentlySearched } from '/store/baseSetting';



const Layout = () => {

  const [coins, setCoins] = useState<SearchCoin[]>([]);
  const [query, setQuery] = useState('');
  const { theme } = useGlobalTheme();
  const { data } = useSearchData({ suspense: false });
  const { data: trandingData } = useSearchTranding({ suspense: false});
  const navigation = useNavigation();
  const dispatch = useAppDispatch();


  const handleItemPress = (id: string, symbol: string) => {
    navigation.navigate('CoinDetail', { param: { id, symbol }, screen: 'Overview' })
    dispatch(changeRecentlySearched(id));
  }

  const handleQueryChangeText = (text: string) => {
    setQuery(text);
    if(!data) return;
    if(text === '') {
      setCoins([]);
    } else {
      let filtered = data.coins.filter(
        coin => 
          coin.id.toLowerCase().includes(text.toLowerCase()) 
          || coin.name.toLowerCase().includes(text.toLowerCase()) 
          || coin.symbol.toLowerCase().includes(text.toLowerCase()) 
      )
      setCoins(filtered)
    }
  }

  return(
    <>
      <FlatListWrap behavior="padding" >
        <FlatList 
          data={coins}
          keyExtractor={(item, index) => item.id + index}
          keyboardDismissMode={Platform.OS === 'ios' ? "interactive" : "on-drag"}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
          }}
          ListHeaderComponent={
            <SearchBar 
              onChangeText={handleQueryChangeText}
              coinsLength={coins.length}
            />
          }
          ListHeaderComponentStyle={{
            paddingHorizontal: parseInt(theme.content.spacing),
            backgroundColor: theme.base.background.surface
          }}
          renderItem={
            ({ item }) => 
              <Item 
                item={item} 
                onPressItem={handleItemPress}
              />
          }
          getItemLayout={(_, index) => (
            { length: 60, offset: 60 * index, index }
          )}
          ListEmptyComponent={
            query 
            ? <EmptyView query={query}/>
            : <DefaultView 
                data={trandingData?.coins}
                onPressItem={handleItemPress}
              />
          }
          stickyHeaderIndices={[0]}
          scrollEventThrottle={1}
        />
      </FlatListWrap>
    </>

  )
}

export default Layout;

const FlatListWrap = styled.KeyboardAvoidingView`
  flex: 1;
`