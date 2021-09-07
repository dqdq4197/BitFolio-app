import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { 
  FlatList, 
  Platform, 
  Dimensions,
  Keyboard,
  EmitterSubscription,
  KeyboardEvent,
  TextInput
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
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
import SearchItemListSkeleton from '/components/skeletonPlaceholder/SearchItemListSkeleton';


const { height } = Dimensions.get('screen');

const AddTrack = () => {
  const { t } = useTranslation();
  const textInputRef = useRef<TextInput>(null);
  const [coins, setCoins] = useState<SearchCoin[]>([]);
  const [query, setQuery] = useState('');
  const [keyboardSpace, SetKeyBoardSpace] = useState(0);
  const { data } = useSearchData({ suspense: false });
  const { theme } = useGlobalTheme();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const { params } = useRoute();
  const dispatch = useAppDispatch();


  useLayoutEffect(() => {
    navigation.setOptions({ title: t(`portfolio.add coin`) })
  }, [])
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

  const resetKeyboardSpace = () => {
    SetKeyBoardSpace(0)
  }

  const handleItemPress = useCallback((id: string) => {
    if(params) {
      let { portfolioId } = (params as { portfolioId: string });

      const { large, name, symbol }: SearchCoin = data!.coins.find(coin => coin.id === id)!;

      const payload = {
        portfolioId, 
        coin: {
          id,
          image: large,
          name,
          symbol
        }
      }

      dispatch(addTrack(payload))
      navigation.navigate('portfolioOverview')
    } 
  }, [data, params])

  const highlightText = (text: string, regex: RegExp) => {
    const match = text.match(regex);
    let newLetters: any = [];
    if(match) {
      let matchLetters = match[0];
      let startIdx = text.indexOf(matchLetters);
      let endIdx = startIdx + matchLetters.length;
      newLetters.push(text.substring(0, startIdx));
      newLetters.push(
        <Text key={startIdx} primaryColor fontML>
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

  const handleRemoveQuery = () => {
    setQuery('');
    if(data)
      setCoins(data.coins);
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
            onQueryChange={handleQueryChangeText}
            coinsLength={coins.length}
            onRemoveQuery={handleRemoveQuery}
            query={query}
          />
        }
        ListHeaderComponentStyle={{
          paddingHorizontal: parseInt(theme.content.spacing),
          backgroundColor: theme.base.background.surface
        }}
        renderItem={
          ({ item }) => (
            <Item 
              item={item} 
              onPressItem={handleItemPress}
            />
          )
        }
        ListEmptyComponent={
          data 
            ? query 
                ? <EmptyView query={query}/>
                : <></>
            : <SearchItemListSkeleton />
          
        }
        initialNumToRender={7}
        stickyHeaderIndices={[0]}
      />
    </>

  )
}

export default AddTrack;