import React from 'react';

import OverviewLayout from '/components/coinMarketDetail/overview/Layout';
import AsyncBoundary from '/components/common/AsyncBoundary';
import { OverviewSkeleton } from '/components/skeletonPlaceholder/coinMarketDetail';

const Overview = () => {
  return (
    <AsyncBoundary skeleton={<OverviewSkeleton />}>
      <OverviewLayout />
    </AsyncBoundary>
  );
};

export default Overview;
