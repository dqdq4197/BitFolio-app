import AsyncBoundary from '@/components/common/async-boundary'
import { TopListSkeleton } from '@/components/skeleton-placeholder/coin-market-home'
import { HighMarketCap } from '..'

const HighMarketCapScreen = () => {
  return (
    <AsyncBoundary skeleton={<TopListSkeleton />}>
      <HighMarketCap />
    </AsyncBoundary>
  )
}

export default HighMarketCapScreen
