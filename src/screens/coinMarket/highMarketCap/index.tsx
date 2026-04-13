
import AsyncBoundary from '/components/common/AsyncBoundary'
import GeneralTemplate from '/components/GeneralTemplate'
import { TopListSkeleton } from '/components/skeletonPlaceholder/coinMarketHome'
import { HighMarketCap } from '..'

const HighMarketCapScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<TopListSkeleton />}>
        <HighMarketCap />
      </AsyncBoundary>
    </GeneralTemplate>
  )
}

export default HighMarketCapScreen
