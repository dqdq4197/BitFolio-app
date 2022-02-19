import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  FlatList,
  Platform,
  TextInput,
  Dimensions,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import useGlobalTheme from '/hooks/useGlobalTheme';
import useRequest from '/hooks/useRequest';
import useKeyboard from '/hooks/useKeyboard';
import { useAppDispatch, useAppSelector } from '/hooks/useRedux';
import { useInitData } from '/hooks/context/useInitDataContext';
import { changeRecentSearches } from '/store/baseSetting';
import { createFuzzyMatcher, getKeyboardAnimationConfigs } from '/lib/utils';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import type {
  SearchTrandingReturn,
  SearchCoin,
} from '/types/coinGeckoReturnType';

import Text from '/components/common/Text';
import GlobalIndicator from '/components/common/GlobalIndicator';
import EmptyView from './EmptyView';
import DefaultView from './DefaultView';
import SearchBar from './SearchBar';
import Item from './Item';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export interface CoinsType extends SearchCoin {
  highlightedName?: Array<string | React.ReactNode>;
  highlightedSymbol?: Array<string | React.ReactNode>;
}

const { height } = Dimensions.get('screen');

const Layout = () => {
  const {
    height: animationKeyboardHeight,
    animationDuration,
    animationEasing,
  } = useKeyboard();
  const textInputRef = useRef<TextInput>(null);
  const { recentSearches } = useAppSelector(state => state.baseSettingReducer);
  const [coins, setCoins] = useState<CoinsType[]>([]);
  const [query, setQuery] = useState('');
  const [searchesData, setSearchesData] = useState<SearchCoin[]>([]);
  const { theme } = useGlobalTheme();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const dispatch = useAppDispatch();
  const { coingeckoAssets: searchData, coingeckoIsLoading: isLoading } =
    useInitData();
  const { data: trandingData } = useRequest<SearchTrandingReturn>(
    CoinGecko.coin.searchTranding(),
    http
  );

  useEffect(() => {
    if (searchData) {
      let filteredData = searchData?.coins.filter(coin =>
        recentSearches.includes(coin.id)
      );
      filteredData = filteredData.sort(
        (a, b) => recentSearches.indexOf(a.id) - recentSearches.indexOf(b.id)
      );
      filteredData = filteredData.filter((coin, index) => {
        const idx = filteredData.findIndex(res => res.id === coin.id);
        return idx === index;
      });
      setSearchesData(filteredData);
    }
  }, [recentSearches, searchData]);

  const handleItemPress = (id: string, symbol: string) => {
    navigation.navigate('CoinDetail', {
      param: { id, symbol },
      screen: 'Overview',
    });
    dispatch(changeRecentSearches(id));
  };

  const highlightText = useCallback(
    (text: string, regex: RegExp, bold?: boolean) => {
      const match = text.match(regex);
      let newLetters: any = [];
      if (match) {
        const matchLetters = match[0];
        const startIdx = text.indexOf(matchLetters);
        const endIdx = startIdx + matchLetters.length;
        newLetters.push(text.substring(0, startIdx));
        if (bold) {
          newLetters.push(
            <Text key={startIdx} primaryColor fontML bold>
              {text.substring(startIdx, endIdx)}
            </Text>
          );
        } else {
          newLetters.push(
            <Text key={startIdx} primaryColor fontML>
              {text.substring(startIdx, endIdx)}
            </Text>
          );
        }
        newLetters.push(text.substring(endIdx, text.length));
      } else {
        newLetters = text;
      }
      return newLetters;
    },
    []
  );

  const handleQueryChange = (text: string) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.scaleY
      )
    );
    setQuery(text);
    if (!searchData) return;

    if (text === '') {
      setCoins([]);
    } else {
      const regex = createFuzzyMatcher(text, {});
      const result = searchData.coins
        .filter(coin => {
          return (
            regex.test(coin.name) ||
            regex.test(coin.id) ||
            regex.test(coin.symbol)
          );
        })
        .map(coin => {
          const coinName = highlightText(coin.name, regex, true);
          const coinSymbol = highlightText(coin.symbol, regex);

          return {
            ...coin,
            highlightedName: coinName,
            highlightedSymbol: coinSymbol,
          };
        });

      setCoins(result);
    }
  };

  const onRemoveQuery = () => {
    setQuery('');
    setCoins([]);
    textInputRef.current?.focus();
  };

  const animationConfig = useMemo(() => {
    return getKeyboardAnimationConfigs(
      animationEasing.value,
      animationDuration.value
    );
  }, [animationEasing, animationDuration]);

  const FooterHeight = useAnimatedStyle(() => {
    return {
      height: withSpring(animationKeyboardHeight.value, animationConfig),
    };
  }, [animationKeyboardHeight, animationConfig]);

  return (
    <>
      {!searchData && (
        <GlobalIndicator isLoaded={false} size="large" transparent />
      )}
      <FlatList
        data={coins}
        keyExtractor={(item, index) => item.id + index + item.name}
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          minHeight: height - headerHeight,
          backgroundColor: theme.base.background.surface,
        }}
        ListFooterComponent={<Animated.View style={FooterHeight} />}
        ListHeaderComponent={
          <SearchBar
            ref={textInputRef}
            isLoading={isLoading}
            onQueryChange={handleQueryChange}
            query={query}
            coinsLength={coins.length}
            onRemoveQuery={onRemoveQuery}
          />
        }
        ListHeaderComponentStyle={{
          paddingHorizontal: parseInt(theme.content.spacing, 10),
          backgroundColor: theme.base.background.surface,
        }}
        renderItem={({ item }) => (
          <Item key={item.id} item={item} onPressItem={handleItemPress} />
        )}
        ListEmptyComponent={
          query ? (
            <EmptyView query={query} />
          ) : (
            <DefaultView
              data={trandingData?.coins}
              searchesData={searchesData}
              onPressItem={handleItemPress}
            />
          )
        }
        initialNumToRender={7}
        stickyHeaderIndices={[0]}
      />
    </>
  );
};

export default Layout;
