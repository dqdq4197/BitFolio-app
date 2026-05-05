import { useSuspenseQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { ScrollView } from 'react-native'
import SearchesEmptyView from './searches-empty-view'
import SearchesItem from './searches-item'
import useGlobalTheme from '@/hooks/use-global-theme'
import useLocales from '@/hooks/use-locales'
import { useAppSelector } from '@/hooks/use-redux'
import { coinsMarketsQuery } from '@/lib/queries/coin-gecko'

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
