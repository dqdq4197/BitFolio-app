import Losers from '/components/coinMarket/popularList/Losers'
import AsyncBoundary from '/components/common/AsyncBoundary'
import { TopListSkeleton } from '/components/skeletonPlaceholder/coinMarketHome'

const LosersScreen = () => {
  return (
    <AsyncBoundary skeleton={<TopListSkeleton />}>
      <Losers />
    </AsyncBoundary>
  )
}

export default LosersScreen
