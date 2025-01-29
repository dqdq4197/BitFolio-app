import React from 'react'

import Losers from '/components/coinMarket/popularList/Losers'
import AsyncBoundary from '/components/common/AsyncBoundary'
import GeneralTemplate from '/components/GeneralTemplate'
import { TopListSkeleton } from '/components/skeletonPlaceholder/coinMarketHome'

const LosersScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<TopListSkeleton />}>
        <Losers />
      </AsyncBoundary>
    </GeneralTemplate>
  )
}

export default LosersScreen
