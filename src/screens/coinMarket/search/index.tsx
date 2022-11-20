import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import AsyncBoundary from '/components/common/AsyncBoundary';
import Layout from '/components/coinSearch/Layout';

const SearchStack = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<MarketListSkeleton />}>
        <Layout />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default SearchStack;
