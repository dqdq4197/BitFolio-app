import React from 'react';

import OverviewLayout from '/components/coinMarketDetail/overview/Layout';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import AsyncBoundary from '/components/common/AsyncBoundary';

const Overview = () => {
  return (
    <AsyncBoundary skeleton={<></>}>
      <OverviewLayout />
    </AsyncBoundary>
  );
};

export default Overview;
