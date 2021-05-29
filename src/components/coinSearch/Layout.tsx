import React, { useState, useEffect } from 'react';
import { FlatList, Platform, Dimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
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
import { changeRecentSearches } from '/store/baseSetting';
import { useAppSelector } from '/hooks/useRedux';
import { createFuzzyMatcher } from '/lib/utils/createFuzzyMatcher';
import Text from '/components/common/Text';


const { height } = Dimensions.get('screen');
const Layout = () => {

  const { recentSearches } = useAppSelector(state => state.baseSettingReducer);
  const [coins, setCoins] = useState<SearchCoin[]>([]);
  const [query, setQuery] = useState('');
  const [searchesData, setSearchesData] = useState<SearchCoin[]>([]);
  const { data } = useSearchData({ suspense: false });
  const { data: trandingData } = useSearchTranding({ suspense: false});
  const { theme } = useGlobalTheme();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(data) {
      let filteredData = data?.coins.filter(coin => recentSearches.includes(coin.id));
      filteredData = filteredData.sort((a, b) => recentSearches.indexOf(a.id) - recentSearches.indexOf(b.id))
      filteredData = filteredData.filter((coin, index) => {
        let idx = filteredData.findIndex(res => res.id === coin.id)
        return idx === index;
      })
      setSearchesData(filteredData)
    }
  }, [recentSearches, data])


  const handleItemPress = (id: string, symbol: string) => {
    navigation.navigate('CoinDetail', { param: { id, symbol }, screen:  'Overview' })
    dispatch(changeRecentSearches(id));
  }

  const highlightText = (text: string, regex: RegExp) => {
    const match = text.match(regex);
    let newLetters: any = [];
    if(match) {
      let matchLetters = match[0];
      let startIdx = text.indexOf(matchLetters);
      let endIdx = startIdx + matchLetters.length;
      newLetters.push(text.substring(0, startIdx));
      newLetters.push(
        <Text primaryColor fontML>
          { text.substring(startIdx, endIdx) }
        </Text>
      );
      newLetters.push(text.substring(endIdx, text.length));
    } else {
      newLetters = text;
    }

    return newLetters;
  }

  const handleQueryChangeText = (text: string) => {
    setQuery(text);
    if(!data) return;
    if(text === '') {
      setCoins([]);
    } else {
      let regex = createFuzzyMatcher(text, {})
      let result = data.coins
        .filter(coin => { 
          return regex.test(coin.name)
            || regex.test(coin.id)
            || regex.test(coin.symbol)
          }
        )
        .map(coin => {
          let coinName = highlightText(coin.name, regex);
          let coinSymbol = highlightText(coin.symbol, regex);

          return {
            ...coin,
            name: coinName,
            symbol: coinSymbol
          }
        })

      setCoins(result)
    }
  }

  return(
    <>
      <Container behavior="padding" keyboardVerticalOffset={65}>
        <FlatList 
          data={coins}
          keyExtractor={(item, index) => item.id + index}
          keyboardDismissMode={Platform.OS === 'ios' ? "interactive" : "on-drag"}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            minHeight: height - headerHeight,
            backgroundColor: theme.base.background.surface
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
                searchesData={searchesData}
                onPressItem={handleItemPress}
              />
          }
          stickyHeaderIndices={[0]}
        />
      </Container>
    </>

  )
}

export default Layout;

const Container = styled.KeyboardAvoidingView`
`