import AsyncBoundary from '@/components/common/async-boundary'
import NewCoin from '@/components/coin-market/popular-list/new-coin'
import MarketListSkeleton from '@/components/skeleton-placeholder/market-list-skeleton'

const NewCoinScreen = () => {
  return (
    <AsyncBoundary skeleton={<MarketListSkeleton />}>
      <NewCoin />
    </AsyncBoundary>
  )
}

export default NewCoinScreen
