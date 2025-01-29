import React from 'react'

import AsyncBoundary from '/components/common/AsyncBoundary'
import GeneralTemplate from '/components/GeneralTemplate'
import NewCoin from '/components/coinMarket/popularList/NewCoin'
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton'

const NewCoinScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<MarketListSkeleton />}>
        <NewCoin />
      </AsyncBoundary>
    </GeneralTemplate>
  )
}

export default NewCoinScreen
