import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { 
  FlatList, 
  Platform, 
  Dimensions,
  Keyboard,
  EmitterSubscription,
  KeyboardEvent,
  TextInput,
  Alert,
  UIManager,
  LayoutAnimation
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SearchCoin } from '/lib/api/CoinGeckoReturnType';
import { createFuzzyMatcher } from '/lib/utils';
import useGlobalTheme from '/hooks/useGlobalTheme';
import useSearchData from '/hooks/useSearchData';
import { useAppDispatch, useAppSelector } from '/hooks/useRedux';
import { addWatchingCoin } from '/store/portfolio';
import Item from '/components/coinSearch/Item';
import EmptyView from '/components/coinSearch/EmptyView';
import SearchBar from '/components/coinSearch/SearchBar';
import Text from '/components/common/Text';
import SearchItemListSkeleton from '/components/skeletonPlaceholder/SearchItemListSkeleton';
import FormModal from '/components/portfolio/transactionModal/FormModal';
import GlobalIndicator from '/components/common/GlobalIndicator';

Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export interface CoinsType extends SearchCoin {
  highlightedName?: Array<string | React.ReactNode>
  highlightedSymbol?: Array<string | React.ReactNode>
}

const { height } = Dimensions.get('screen');

const Layout = () => {
  const { t } = useTranslation();
  const textInputRef = useRef<TextInput>(null);
  const [coins, setCoins] = useState<CoinsType[]>([]);
  const [query, setQuery] = useState('');
  const [keyboardSpace, SetKeyBoardSpace] = useState(0);
  const [visible, setVisible] = useState(false);
  const [modalInitialState, setModalInitialState] = useState({
    id: '',
    symbol: '',
    image: '',
    name: ''
  })
  const { data } = useSearchData({ suspense: false });
  const { theme } = useGlobalTheme();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const { params } = useRoute();
  const dispatch = useAppDispatch();
  const { portfolios, activeIndex } = useAppSelector(state => ({
    portfolios: state.portfolioReducer.portfolios,
    activeIndex: state.portfolioReducer.activeIndex
  }))
  const { id: portfolioId, coins: portfolioCoins } = portfolios[activeIndex];


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

  const isAlreadyIncludeCoin = (id: string): boolean => {
    return portfolioCoins.find(coin => coin.id === id) !== undefined
  }


  const openAlert = (
    id: string,
    symbol: string,
    image: string,
    name: string
  ) => {
    Alert.alert(              
      t(`portfolio.n.is already in your portfolio`, { n: symbol }),            
      t(`portfolio.would you like to add a transaction to.n?`, { n: symbol }),                        
      [                              
        {
          text: t(`common.cancel`),                              
          onPress: () => console.log("cancel add transaction"),
          style: "cancel"
        },
        { 
          text: t(`portfolio.add transaction`), 
          onPress: () => {
            setModalInitialState({ id, symbol, image, name })
            setVisible(true);
          },
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  }

  const handleItemPress = useCallback((
    id: string, 
    symbol: string,
    image: string,
    name: string
  ) => {
    if(portfolioId) {
      if(isAlreadyIncludeCoin(id)) {
        return openAlert(id, symbol, image, name);
      }

      const payload = {
        portfolioId, 
        coin: { id, image, name, symbol }
      }

      dispatch(addWatchingCoin(payload))
      navigation.navigate('portfolioOverview')
    } 
  }, [data, params])

  const highlightText = (text: string, regex: RegExp, bold?: boolean) => {
    const match = text.match(regex);
    let newLetters: any = [];
    if(match) {
      let matchLetters = match[0];
      let startIdx = text.indexOf(matchLetters);
      let endIdx = startIdx + matchLetters.length;
      newLetters.push(text.substring(0, startIdx));
      if(bold) {
        newLetters.push(
          <Text key={startIdx} primaryColor fontML bold>
            { text.substring(startIdx, endIdx) }
          </Text>
        );
      } else {
        newLetters.push(
          <Text key={startIdx} primaryColor fontML>
            { text.substring(startIdx, endIdx) }
          </Text>
        );
      }
      newLetters.push(text.substring(endIdx, text.length));
    } else {
      newLetters = text;
    }

    return newLetters;
  }

  const handleQueryChange = (text: string) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.scaleY
      )
    );
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
        let coinName = highlightText(coin.name, regex, true);
        let coinSymbol = highlightText(coin.symbol, regex);
        return {
          ...coin,
          highlightedName: coinName,
          highlightedSymbol: coinSymbol
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
      { !data && (
        <GlobalIndicator 
          isLoaded={false}
          size="large"
          transparent
        />
      ) }
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
      { visible && modalInitialState.id && (
        <FormModal
          visible={visible}
          setVisible={setVisible}
          portfolioId={portfolioId}
          id={modalInitialState.id}
          symbol={modalInitialState.symbol}
          name={modalInitialState.name}
          image={modalInitialState.image}
          afterAddTransactionTodo={() => navigation.navigate('portfolioOverview')}
        />
      )}
    </>

  )
}

export default Layout;