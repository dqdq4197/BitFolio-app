import HighVolume from '@/components/coinMarket/popularList/HighVolume'
import AsyncBoundary from '@/components/common/AsyncBoundary'
import { TopListSkeleton } from '@/components/skeletonPlaceholder/coinMarketHome'

const HighVolumeScreen = () => {
  return (
    <AsyncBoundary skeleton={<TopListSkeleton />}>
      <HighVolume />
    </AsyncBoundary>
  )
}

export default HighVolumeScreen
