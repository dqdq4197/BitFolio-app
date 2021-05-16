import React from 'react';
import OverViewLayout from '/components/coinMarketDetail/overview/Layout';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';


const Overview = () => {
  return (
    <ErrorBoundaryAndSuspense skeleton={<CoinDetailSkeleton/>} >
      <OverViewLayout/>
    </ErrorBoundaryAndSuspense>
  )
}

export default Overview;