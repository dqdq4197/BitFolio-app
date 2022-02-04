import React from 'react';

import DiscussionLayout from '/components/coinMarketDetail/discussion/Layout';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const Notice = () => {
  return (
    <ErrorBoundaryAndSuspense skeleton={<MarketListSkeleton />}>
      <DiscussionLayout />
    </ErrorBoundaryAndSuspense>
  );
};

export default Notice;
