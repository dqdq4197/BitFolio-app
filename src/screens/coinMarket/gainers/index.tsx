import React from 'react'

import Gainers from '/components/coinMarket/popularList/Gainers'
import AsyncBoundary from '/components/common/AsyncBoundary'
import GeneralTemplate from '/components/GeneralTemplate'
import { TopListSkeleton } from '/components/skeletonPlaceholder/coinMarketHome'

const GainersScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<TopListSkeleton />}>
        <Gainers />
      </AsyncBoundary>
    </GeneralTemplate>
  )
}

export default GainersScreen
