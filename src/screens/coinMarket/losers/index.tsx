import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import Losers from '/components/coinMarket/popularList/Losers';
import TopListSkeleton from '/components/skeletonPlaceholder/TopListSkeleton';
import AsyncBoundary from '/components/common/AsyncBoundary';

const LosersScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<TopListSkeleton />}>
        <Losers />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default LosersScreen;
