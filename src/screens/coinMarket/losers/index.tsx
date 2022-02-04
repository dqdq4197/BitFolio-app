import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import Losers from '/components/coinMarket/popularList/Losers';
import TopListSkeleton from '/components/skeletonPlaceholder/TopListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const LosersScreen = () => {
  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<TopListSkeleton />}>
        <Losers />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  );
};

export default LosersScreen;
