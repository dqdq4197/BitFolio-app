import Gainers from '@/components/coinMarket/popularList/Gainers'
import AsyncBoundary from '@/components/common/AsyncBoundary'
import { TopListSkeleton } from '@/components/skeletonPlaceholder/coinMarketHome'

const GainersScreen = () => {
  return (
    <AsyncBoundary skeleton={<TopListSkeleton />}>
      <Gainers />
    </AsyncBoundary>
  )
}

export default GainersScreen
