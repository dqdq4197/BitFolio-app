import React from 'react';
import GeneralTemplate from '/components/GeneralTemplate';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';
import Layout from '/components/coinSearch/Layout';

const SearchStack = ({}) => {

  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<MarketListSkeleton />}>
        <Layout />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default SearchStack;