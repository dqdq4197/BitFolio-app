import React from 'react';

import NewsLayout from '/components/coinMarketDetail/news/Layout';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import AsyncBoundary from '/components/common/AsyncBoundary';

const News = () => {
  return (
    <AsyncBoundary skeleton={<MarketListSkeleton />}>
      <NewsLayout />
    </AsyncBoundary>
  );
};

export default News;
