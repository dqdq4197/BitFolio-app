import { useHeaderHeight } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  Alert,
  Dimensions,
  FlatList,
  LayoutAnimation,
  Platform,
  TextInput,
  UIManager,
} from 'react-native'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'

import useGlobalTheme from '/hooks/useGlobalTheme'
import useKeyboard from '/hooks/useKeyboard'
import useLocales from '/hooks/useLocales'
import { useAppDispatch, useAppSelector } from '/hooks/useRedux'
import useRequest from '/hooks/useRequest'
import { CoinGecko, http } from '/lib/api/CoinGeckoClient'
import { createFuzzyMatcher, getKeyboardAnimationConfigs } from '/lib/utils'
import { addWatchingCoin } from '/store/slices/portfolio'
import type { SearchCoin, SearchDataReturn } from '/types/coinGeckoReturnType'
import type { PortfolioScreenProps } from '/types/navigation'

import EmptyView from '/components/coinSearch/EmptyView'
import Item from '/components/coinSearch/Item'
import SearchBar from '/components/coinSearch/SearchBar'
import GlobalIndicator from '/components/common/GlobalIndicator'
import Text from '/components/common/Text'
import FormModal from '/components/portfolio/transactionModal/FormModal'
import SearchItemListSkeleton from '/components/skeletonPlaceholder/SearchItemListSkeleton'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

export interface CoinsType extends SearchCoin {
  highlightedName?: Array<string | React.ReactNode>
  highlightedSymbol?: Array<string | React.ReactNode>
}

const { height } = Dimensions.get('screen')

const Layout = () => {
  const { t } = useTranslation()
  const { language } = useLocales()
  const { theme } = useGlobalTheme()
  const navigation =
    useNavigation<PortfolioScreenProps<'AddNewCoin'>['navigation']>()
  const headerHeight = useHeaderHeight()
  const dispatch = useAppDispatch()
  const {
    height: animationKeyboardHeight,
    animationDuration,
    animationEasing,
  } = useKeyboard()
  const textInputRef = useRef<TextInput>(null)
  const [coins, setCoins] = useState<CoinsType[]>([])
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(false)
  const [modalInitialState, setModalInitialState] = useState({
    id: '',
    symbol: '',
    image: '',
    name: '',
  })
  const { portfolios, activeIndex } = useAppSelector(state => ({
    portfolios: state.portfolioReducer.portfolios,
    activeIndex: state.portfolioReducer.activeIndex,
  }))
  const { id: portfolioId, coins: portfolioCoins } = portfolios[activeIndex]
  const { data, isLoading } = useRequest<SearchDataReturn>(
    CoinGecko.coin.search({ locale: language }),
    http
  )

  useLayoutEffect(() => {
    navigation.setOptions({ title: t(`portfolio.add coin`) })
  }, [navigation, t])

  useEffect(() => {
    if (data) setCoins(data.coins)
  }, [data])

  const isAlreadyIncludeCoin = useCallback(
    (id: string): boolean => {
      return portfolioCoins.find(coin => coin.id === id) !== undefined
    },
    [portfolioCoins]
  )

  const openAlert = useCallback(
    (id: string, symbol: string, image: string, name: string) => {
      Alert.alert(
        t(`portfolio.n.is already in your portfolio`, { n: symbol }),
        t(`portfolio.would you like to add a transaction to.n?`, { n: symbol }),
        [
          {
            text: t(`common.cancel`),
            onPress: () => console.log('cancel add transaction'),
            style: 'cancel',
          },
          {
            text: t(`portfolio.add transaction`),
            onPress: () => {
              setModalInitialState({ id, symbol, image, name })
              setVisible(true)
            },
            style: 'destructive',
          },
        ],
        { cancelable: false }
      )
    },
    [t]
  )

  const handleItemPress = useCallback(
    (id: string, symbol: string, image: string, name: string) => {
      if (!portfolioId) return

      if (isAlreadyIncludeCoin(id)) {
        openAlert(id, symbol, image, name)
        return
      }

      const payload = {
        portfolioId,
        coin: { id, image, name, symbol },
      }

      dispatch(addWatchingCoin(payload))
      navigation.navigate('PortfolioOverview')
    },
    [dispatch, isAlreadyIncludeCoin, navigation, openAlert, portfolioId]
  )

  const highlightText = (text: string, regex: RegExp, bold?: boolean) => {
    const match = text.match(regex)
    let newLetters: any = []
    if (match) {
      const matchLetters = match[0]
      const startIdx = text.indexOf(matchLetters)
      const endIdx = startIdx + matchLetters.length
      newLetters.push(text.substring(0, startIdx))
      if (bold) {
        newLetters.push(
          <Text key={startIdx} primaryColor fontML bold>
            {text.substring(startIdx, endIdx)}
          </Text>
        )
      } else {
        newLetters.push(
          <Text key={startIdx} primaryColor fontML>
            {text.substring(startIdx, endIdx)}
          </Text>
        )
      }
      newLetters.push(text.substring(endIdx, text.length))
    } else {
      newLetters = text
    }

    return newLetters
  }

  const handleQueryChange = (text: string) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.scaleY
      )
    )
    setQuery(text)
    if (!data) return

    const regex = createFuzzyMatcher(text, {})
    const result = data.coins
      .filter(coin => {
        return (
          regex.test(coin.name) ||
          regex.test(coin.id) ||
          regex.test(coin.symbol)
        )
      })
      .map(coin => {
        const coinName = highlightText(coin.name, regex, true)
        const coinSymbol = highlightText(coin.symbol, regex)
        return {
          ...coin,
          highlightedName: coinName,
          highlightedSymbol: coinSymbol,
        }
      })
    setCoins(result)
  }

  const handleRemoveQuery = () => {
    setQuery('')
    if (data) setCoins(data.coins)
    textInputRef.current?.focus()
  }

  const animationConfig = useMemo(() => {
    return getKeyboardAnimationConfigs(
      animationEasing.value,
      animationDuration.value
    )
  }, [animationEasing, animationDuration])

  const FooterHeight = useAnimatedStyle(() => {
    return {
      height: withSpring(animationKeyboardHeight.value, animationConfig),
    }
  }, [animationKeyboardHeight, animationConfig])

  return (
    <>
      {!data && <GlobalIndicator isLoaded={false} size="large" transparent />}
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
            coinsLength={coins.length}
            onRemoveQuery={handleRemoveQuery}
            query={query}
          />
        }
        ListHeaderComponentStyle={{
          paddingHorizontal: parseInt(theme.content.spacing, 10),
          backgroundColor: theme.base.background.surface,
        }}
        renderItem={({ item }) => (
          <Item item={item} onPressItem={handleItemPress} />
        )}
        ListEmptyComponent={
          data ? (
            query ? (
              <EmptyView query={query} />
            ) : (
              <></>
            )
          ) : (
            <SearchItemListSkeleton />
          )
        }
        initialNumToRender={7}
        stickyHeaderIndices={[0]}
      />
      {visible && modalInitialState.id && (
        <FormModal
          visible={visible}
          setVisible={setVisible}
          portfolioId={portfolioId}
          id={modalInitialState.id}
          symbol={modalInitialState.symbol}
          name={modalInitialState.name}
          image={modalInitialState.image}
          afterAddTransactionTodo={() =>
            navigation.navigate('PortfolioOverview')
          }
        />
      )}
    </>
  )
}

export default Layout
