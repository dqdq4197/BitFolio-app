import React, { useCallback, useRef, useState } from 'react'

import type { SearchCoin } from '/types/coinGeckoReturnType'

import { useHeaderHeight } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Dimensions, FlatList, Platform, type TextInput } from 'react-native'
import DefaultView from './DefaultView'
import EmptyView from './EmptyView'
import ListFooter from './ListFooter'
import SearchBar from './SearchBar'
import SearchItem from './SearchItem'
import GlobalIndicator from '/components/common/GlobalIndicator'
import useDebounce from '/hooks/useDebounce'
import useGlobalTheme from '/hooks/useGlobalTheme'
import { useAppDispatch } from '/hooks/useRedux'
import { searchQuery } from '/lib/queries/coinGecko'
import { changeRecentSearches } from '/store/slices/baseSetting'
import type { HomeScreenProps } from '/types/navigation'

export interface CoinsType extends SearchCoin {
  highlightedName?: Array<string | React.ReactNode>
  highlightedSymbol?: Array<string | React.ReactNode>
}

const { height } = Dimensions.get('screen')

const Layout = () => {
  const searchBarRef = useRef<TextInput>(null)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const { theme } = useGlobalTheme()
  const navigation =
    useNavigation<HomeScreenProps<'CoinSearch'>['navigation']>()
  const headerHeight = useHeaderHeight()
  const dispatch = useAppDispatch()
  const {
    data: searchData,
    isFetching,
    isFetched,
  } = useQuery({
    ...searchQuery({ query: debouncedQuery }),
    placeholderData: keepPreviousData,
  })
  const { coins } = searchData ?? {}

  const handleQueryChange = useCallback((text: string) => {
    setQuery(text)
  }, [])

  const handleRemoveQuery = useCallback(() => {
    setQuery('')
    searchBarRef.current?.focus()
  }, [])

  const handleItemPress = (id: string, symbol: string) => {
    navigation.navigate('CoinDetail', {
      params: { id, symbol },
      screen: 'Overview',
    })
    dispatch(changeRecentSearches(id))
  }

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
            query={query}
            onQueryChange={handleQueryChange}
            onRemoveQuery={handleRemoveQuery}
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
            onPress={() => handleItemPress(item.id, item.symbol)}
          />
        )}
        ListEmptyComponent={
          debouncedQuery && isFetched ? (
            <EmptyView query={debouncedQuery} />
          ) : (
            <DefaultView onPressItem={handleItemPress} />
          )
        }
        stickyHeaderIndices={[0]}
      />
    </>
  )
}

export default Layout
