import { useHeaderHeight } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Alert,
  Dimensions,
  FlatList,
  Platform,
  type TextInput,
} from 'react-native'
import FormModal from '../transactionModal/FormModal'
import EmptyView from '/components/coinSearch/EmptyView'
import ListFooter from '/components/coinSearch/ListFooter'
import SearchBar from '/components/coinSearch/SearchBar'
import SearchItem from '/components/coinSearch/SearchItem'
import GlobalIndicator from '/components/common/GlobalIndicator'
import useDebounce from '/hooks/useDebounce'
import useGlobalTheme from '/hooks/useGlobalTheme'
import { useAppDispatch, useAppSelector } from '/hooks/useRedux'
import { searchQuery } from '/lib/queries/coinGecko'
import {
  addWatchingCoin,
  type AddWatchingCoinProps,
} from '/store/slices/portfolio'
import type { PortfolioScreenProps } from '/types/navigation'

const { height } = Dimensions.get('screen')

function Layout() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { theme } = useGlobalTheme()
  const headerHeight = useHeaderHeight()
  const navigation =
    useNavigation<PortfolioScreenProps<'AddNewCoin'>['navigation']>()
  const searchBarRef = useRef<TextInput>(null)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
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
  const {
    data: searchData,
    isFetching,
    isFetched,
  } = useQuery({
    ...searchQuery({ query: debouncedQuery }),
    placeholderData: keepPreviousData,
  })
  const { coins } = searchData ?? {}

  const isAlreadyIncludeCoin = useCallback(
    (id: string): boolean => {
      return portfolioCoins.find(coin => coin.id === id) !== undefined
    },
    [portfolioCoins]
  )

  const openAlert = useCallback(
    (item: AddWatchingCoinProps['coin']) => {
      const { id, symbol, image, name } = item

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
    (item: AddWatchingCoinProps['coin']) => {
      if (!portfolioId) return

      if (isAlreadyIncludeCoin(item.id)) {
        openAlert(item)
        return
      }

      const payload = {
        portfolioId,
        coin: item,
      } satisfies AddWatchingCoinProps

      dispatch(addWatchingCoin(payload))
      navigation.navigate('PortfolioOverview')
    },
    [dispatch, isAlreadyIncludeCoin, navigation, openAlert, portfolioId]
  )

  const handleQueryChange = useCallback((text: string) => {
    setQuery(text)
  }, [])

  const handleRemoveQuery = useCallback(() => {
    setQuery('')
    searchBarRef.current?.focus()
  }, [])

  return (
    <>
      {isFetching && (
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
        ListFooterComponent={<ListFooter />}
        ListHeaderComponent={
          <SearchBar
            ref={searchBarRef}
            onQueryChange={handleQueryChange}
            onRemoveQuery={handleRemoveQuery}
            query={query}
          />
        }
        ListHeaderComponentStyle={{
          paddingHorizontal: parseInt(theme.content.spacing, 10),
          backgroundColor: theme.base.background.surface,
        }}
        renderItem={({ item }) => (
          <SearchItem
            item={item}
            keyword={debouncedQuery}
            onPress={() => handleItemPress({ ...item, image: item.large })}
          />
        )}
        ListEmptyComponent={
          debouncedQuery && isFetched ? (
            <EmptyView query={debouncedQuery} />
          ) : (
            <></>
          )
        }
        initialNumToRender={15}
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
