import React from 'react'

import DiscussionLayout from '/components/coinMarketDetail/discussion/Layout'
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton'
import AsyncBoundary from '/components/common/AsyncBoundary'

const Discussion = () => {
  return (
    <AsyncBoundary skeleton={<MarketListSkeleton />}>
      <DiscussionLayout />
    </AsyncBoundary>
  )
}

export default Discussion
