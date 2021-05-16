import React from 'react';
import GeneralTemplate from '/components/GeneralTemplate';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const SearchStack = ({}) => {

  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<MarketListSkeleton />}>
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default SearchStack;