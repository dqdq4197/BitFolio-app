import React from 'react';
import GeneralTemplate from '/components/GeneralTemplate';
import HighMarketcap from '/components/coinMarket/popularList/HighMarketcap';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const NewCoinScreen = ({}) => {

  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<MarketListSkeleton />}>
        <HighMarketcap />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default NewCoinScreen;