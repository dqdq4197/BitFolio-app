import OverviewLayout from '@/components/coin-market-detail/overview/layout'
import AsyncBoundary from '@/components/common/async-boundary'
import { OverviewSkeleton } from '@/components/skeleton-placeholder/coin-market-detail'

const Overview = () => {
  return (
    <AsyncBoundary skeleton={<OverviewSkeleton />}>
      <OverviewLayout />
    </AsyncBoundary>
  )
}

export default Overview
