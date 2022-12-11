import React from 'react';

import NewsLayout from '/components/coinMarketDetail/news/Layout';
import AsyncBoundary from '/components/common/AsyncBoundary';
import { NewsArticleListSkeleton } from '/components/skeletonPlaceholder/news';

const News = () => {
  return (
    <AsyncBoundary skeleton={<NewsArticleListSkeleton />}>
      <NewsLayout />
    </AsyncBoundary>
  );
};

export default News;
