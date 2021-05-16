import React from 'react';
import OverViewLayout from '/components/coinMarketDetail/overview/Layout';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';


const Overview = () => {
  return (
    <ErrorBoundaryAndSuspense skeleton={<MarketListSkeleton/>} >
      <OverViewLayout/>
    </ErrorBoundaryAndSuspense>
  )
}

export default Overview;