import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import HighMarketcap from '/components/coinMarket/popularList/HighMarketcap';
import TopListSkeleton from '/components/skeletonPlaceholder/TopListSkeleton';
import AsyncBoundary from '/components/common/AsyncBoundary';

const HighMarketCapScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<TopListSkeleton />}>
        <HighMarketcap />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default HighMarketCapScreen;
