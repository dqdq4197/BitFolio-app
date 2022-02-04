import React from 'react';

import NewsLayout from '/components/coinMarketDetail/news/Layout';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const News = () => {
  return (
    <ErrorBoundaryAndSuspense skeleton={<MarketListSkeleton />}>
      <NewsLayout />
    </ErrorBoundaryAndSuspense>
  );
};

export default News;
