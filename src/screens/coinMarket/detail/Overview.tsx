import React from 'react';

import OverviewLayout from '/components/coinMarketDetail/overview/Layout';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const Overview = () => {
  return (
    <ErrorBoundaryAndSuspense skeleton={<CoinDetailSkeleton />}>
      <OverviewLayout />
    </ErrorBoundaryAndSuspense>
  );
};

export default Overview;
