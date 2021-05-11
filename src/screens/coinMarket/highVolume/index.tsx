import React from 'react';
import GeneralTemplate from '/components/GeneralTemplate';
import HighVolume from '/components/coinMarket/popularList/HighVolume';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const NewCoinScreen = ({}) => {

  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<MarketListSkeleton />}>
        <HighVolume />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default NewCoinScreen;