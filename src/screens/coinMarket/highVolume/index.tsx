import React from 'react'

import HighVolume from '/components/coinMarket/popularList/HighVolume'
import AsyncBoundary from '/components/common/AsyncBoundary'
import GeneralTemplate from '/components/GeneralTemplate'
import { TopListSkeleton } from '/components/skeletonPlaceholder/coinMarketHome'

const HighVolumeScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<TopListSkeleton />}>
        <HighVolume />
      </AsyncBoundary>
    </GeneralTemplate>
  )
}

export default HighVolumeScreen
