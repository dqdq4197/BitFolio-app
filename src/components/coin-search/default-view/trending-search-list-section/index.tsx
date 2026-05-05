import { useSuspenseQuery } from '@tanstack/react-query'
import SearchItem from '../../search-item'
import { trendingSearchQuery } from '@/lib/queries/coin-gecko'

interface Props {
  onPressItem: (id: string, symbol: string) => void
}

function TrendingSearchListSection(props: Props) {
  const { onPressItem } = props
  const {
    data: { coins },
  } = useSuspenseQuery(trendingSearchQuery())

  return coins.map(({ item }, index) => (
    <SearchItem
      key={item.id}
      index={index}
      item={item}
      onPress={() => onPressItem(item.id, item.symbol)}
    />
  ))
}

export default TrendingSearchListSection
