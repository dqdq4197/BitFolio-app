import React from 'react';
import GeneralTemplate from '/components/GeneralTemplate';
import NewCoin from '/components/coinMarket/popularList/NewCoin';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const NewCoinScreen = ({}) => {

  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<MarketListSkeleton />}>
        <NewCoin />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default NewCoinScreen;