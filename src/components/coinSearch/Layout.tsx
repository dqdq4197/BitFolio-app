import React, { useState, useEffect, useRef } from 'react';
import { 
  FlatList, 
  Platform, 
  TextInput,
  Dimensions,
  Keyboard,
  EmitterSubscription,
  KeyboardEvent,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
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
import { createFuzzyMatcher } from '/lib/utils';
import Text from '/components/common/Text';


const { height } = Dimensions.get('screen');
const Layout = () => {

  const textInputRef = useRef<TextInput>(null);
  const { recentSearches } = useAppSelector(state => state.baseSettingReducer);
  const [coins, setCoins] = useState<SearchCoin[]>([]);
  const [query, setQuery] = useState('');
  const [searchesData, setSearchesData] = useState<SearchCoin[]>([]);
  const [keyboardSpace, SetKeyBoardSpace] = useState(0);
  const { data } = useSearchData({ suspense: false });
  const { data: trandingData } = useSearchTranding({ suspense: false});
  const { theme } = useGlobalTheme();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let keyboardWillShowEvent: EmitterSubscription;
    let keyboardWillHideEvent: EmitterSubscription;

    if(Platform.OS === 'android') {
      keyboardWillShowEvent = Keyboard.addListener(
        'keyboardDidShow', 
        updateKeyboardSpace
      )

      keyboardWillHideEvent = Keyboard.addListener(
        'keyboardDidHide', 
        resetKeyboardSpace
      )
    } else {
      keyboardWillShowEvent = Keyboard.addListener(
        'keyboardWillShow', 
        updateKeyboardSpace
      )

      keyboardWillHideEvent = Keyboard.addListener(
        'keyboardWillHide', 
        resetKeyboardSpace
      )
    }
    
    return () => {
      // keyboard event 해제
      keyboardWillShowEvent && keyboardWillShowEvent.remove();
      keyboardWillHideEvent && keyboardWillHideEvent.remove();
    }
  }, [])

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

  const updateKeyboardSpace = (event: KeyboardEvent) => {
    SetKeyBoardSpace(event.endCoordinates.height)
  }

  const resetKeyboardSpace = (event: KeyboardEvent) => {
    SetKeyBoardSpace(0)
  }

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

  const handleQueryChange = (text: string) => {
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

  const onRemoveQuery = () => {
    setQuery('');
    setCoins([]);
    textInputRef.current?.focus();
  }

  return(
    <>
      <FlatList 
        data={coins}
        keyExtractor={(item, index) => item.id + index + item.name}
        keyboardDismissMode={Platform.OS === 'ios' ? "interactive" : "on-drag"}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          minHeight: height - headerHeight,
          backgroundColor: theme.base.background.surface,
          paddingBottom: keyboardSpace
        }}
        ListHeaderComponent={
          <SearchBar 
            ref={textInputRef}
            onQueryChange={handleQueryChange}
            query={query}
            coinsLength={coins.length}
            onRemoveQuery={onRemoveQuery}
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
    </>
  )
}

export default Layout;