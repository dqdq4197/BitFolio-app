import Gainers from '@/components/coin-market/popular-list/gainers'
import AsyncBoundary from '@/components/common/async-boundary'
import { TopListSkeleton } from '@/components/skeleton-placeholder/coin-market-home'

const GainersScreen = () => {
  return (
    <AsyncBoundary skeleton={<TopListSkeleton />}>
      <Gainers />
    </AsyncBoundary>
  )
}

export default GainersScreen
