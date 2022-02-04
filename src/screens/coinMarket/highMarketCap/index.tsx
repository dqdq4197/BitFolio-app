import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import HighMarketcap from '/components/coinMarket/popularList/HighMarketcap';
import TopListSkeleton from '/components/skeletonPlaceholder/TopListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const HighMarketCapScreen = () => {
  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<TopListSkeleton />}>
        <HighMarketcap />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  );
};

export default HighMarketCapScreen;
