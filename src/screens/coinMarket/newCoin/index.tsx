import AsyncBoundary from '@/components/common/AsyncBoundary'
import NewCoin from '@/components/coinMarket/popularList/NewCoin'
import MarketListSkeleton from '@/components/skeletonPlaceholder/MarketListSkeleton'

const NewCoinScreen = () => {
  return (
    <AsyncBoundary skeleton={<MarketListSkeleton />}>
      <NewCoin />
    </AsyncBoundary>
  )
}

export default NewCoinScreen
