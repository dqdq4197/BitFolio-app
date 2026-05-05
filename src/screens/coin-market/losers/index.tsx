import Losers from '@/components/coin-market/popular-list/losers'
import AsyncBoundary from '@/components/common/async-boundary'
import { TopListSkeleton } from '@/components/skeleton-placeholder/coin-market-home'

const LosersScreen = () => {
  return (
    <AsyncBoundary skeleton={<TopListSkeleton />}>
      <Losers />
    </AsyncBoundary>
  )
}

export default LosersScreen
