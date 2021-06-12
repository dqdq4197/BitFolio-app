import React, { useState, useEffect, useCallback } from 'react';
import { 
  FlatList, 
  Platform, 
  Dimensions,
  Keyboard,
  EmitterSubscription,
  KeyboardEvent,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import useGlobalTheme from '/hooks/useGlobalTheme';
import EmptyView from '/components/coinSearch/EmptyView';
import SearchBar from '/components/coinSearch/SearchBar';
import { SearchCoin } from '/lib/api/CoinGeckoReturnType';
import useSearchData from '/hooks/useSearchData';
import Item from '/components/coinSearch/Item';
import { createFuzzyMatcher } from '/lib/utils';
import Text from '/components/common/Text';
import { useAppDispatch } from '/hooks/useRedux';
import { addTrack } from '/store/portfolio';


const { height } = Dimensions.get('screen');

const AddTrack = () => {
  const [coins, setCoins] = useState<SearchCoin[]>([]);
  const [query, setQuery] = useState('');
  const [keyboardSpace, SetKeyBoardSpace] = useState(0);
  const { data } = useSearchData({ suspense: false });
  const { theme } = useGlobalTheme();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const { params } = useRoute();
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
    if(data)
      setCoins(data.coins)
  }, [data])

  const updateKeyboardSpace = (event: KeyboardEvent) => {
    SetKeyBoardSpace(event.endCoordinates.height)
  }

  const resetKeyboardSpace = (event: KeyboardEvent) => {
    SetKeyBoardSpace(0)
  }


  const handleItemPress = (id: string) => {
    if(params) {
      let { portfolioId } = (params as { portfolioId: string })
      dispatch(addTrack({ portfolioId, id }))
      navigation.navigate('portfolioOverView')
    } 
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

  const handleQueryChangeText = useCallback((text: string) => {
    setQuery(text);
    if(!data) return;
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
  }, [data])


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
          : <></>
        }
        stickyHeaderIndices={[0]}
      />
    </>

  )
}

export default AddTrack;

const Container = styled.KeyboardAvoidingView`
flex: 1;
`