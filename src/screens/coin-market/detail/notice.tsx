import DiscussionLayout from '@/components/coin-market-detail/discussion/layout'
import MarketListSkeleton from '@/components/skeleton-placeholder/market-list-skeleton'
import AsyncBoundary from '@/components/common/async-boundary'

const Notice = () => {
  return (
    <AsyncBoundary skeleton={<MarketListSkeleton />}>
      <DiscussionLayout />
    </AsyncBoundary>
  )
}

export default Notice
