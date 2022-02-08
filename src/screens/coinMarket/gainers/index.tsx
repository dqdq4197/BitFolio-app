import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import Gainers from '/components/coinMarket/popularList/Gainers';
import TopListSkeleton from '/components/skeletonPlaceholder/TopListSkeleton';
import AsyncBoundary from '/components/common/AsyncBoundary';

const GainersScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<TopListSkeleton />}>
        <Gainers />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default GainersScreen;
