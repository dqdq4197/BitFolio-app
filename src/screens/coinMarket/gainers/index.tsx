import React from 'react';
import GeneralTemplate from '/components/GeneralTemplate';
import Gainers from '/components/coinMarket/popularList/Gainers';
import TopListSkeleton from '/components/skeletonPlaceholder/TopListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const GainersScreen = ({}) => {

  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<TopListSkeleton />}>
        <Gainers />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default GainersScreen;