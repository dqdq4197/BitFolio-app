import AsyncBoundary from '@/components/common/AsyncBoundary'
import { TopListSkeleton } from '@/components/skeletonPlaceholder/coinMarketHome'
import { HighMarketCap } from '..'

const HighMarketCapScreen = () => {
  return (
    <AsyncBoundary skeleton={<TopListSkeleton />}>
      <HighMarketCap />
    </AsyncBoundary>
  )
}

export default HighMarketCapScreen
