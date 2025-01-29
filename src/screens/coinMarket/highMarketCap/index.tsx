import React from 'react'

import HighMarketcap from '/components/coinMarket/popularList/HighMarketcap'
import AsyncBoundary from '/components/common/AsyncBoundary'
import GeneralTemplate from '/components/GeneralTemplate'
import { TopListSkeleton } from '/components/skeletonPlaceholder/coinMarketHome'

const HighMarketCapScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<TopListSkeleton />}>
        <HighMarketcap />
      </AsyncBoundary>
    </GeneralTemplate>
  )
}

export default HighMarketCapScreen
