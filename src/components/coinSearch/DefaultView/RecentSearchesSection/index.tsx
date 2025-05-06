import { useSuspenseQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import React from 'react'
import { ScrollView } from 'react-native'
import SearchesEmptyView from './SearchesEmptyView'
import SearchesItem from './SearchesItem'
import useGlobalTheme from '/hooks/useGlobalTheme'
import useLocales from '/hooks/useLocales'
import { useAppSelector } from '/hooks/useRedux'
import { coinsMarketsQuery } from '/lib/queries/coinGecko'

interface Props {
  onPressItem: (id: string, symbol: string) => void
}

function RecentSearchesSection(props: Props) {
  const { onPressItem } = props
  const { currency } = useLocales()
  const { theme } = useGlobalTheme()
  const { recentSearches } = useAppSelector(state => state.baseSettingReducer)
  const { data: coinsMarketsData } = useSuspenseQuery(
    coinsMarketsQuery({ vs_currency: currency, ids: recentSearches })
  )

  if (isEmpty(coinsMarketsData)) {
    return <SearchesEmptyView />
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: parseInt(theme.content.spacing, 10),
      }}
    >
      {coinsMarketsData.map(coinMarket => (
        <SearchesItem
          key={coinMarket.id}
          coinMarket={coinMarket}
          onPressItem={onPressItem}
        />
      ))}
    </ScrollView>
  )
}

export default RecentSearchesSection
