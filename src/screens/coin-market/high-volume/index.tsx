import HighVolume from '@/components/coin-market/popular-list/high-volume'
import AsyncBoundary from '@/components/common/async-boundary'
import { TopListSkeleton } from '@/components/skeleton-placeholder/coin-market-home'

const HighVolumeScreen = () => {
  return (
    <AsyncBoundary skeleton={<TopListSkeleton />}>
      <HighVolume />
    </AsyncBoundary>
  )
}

export default HighVolumeScreen
