import React from 'react';
import GeneralTemplate from '/components/GeneralTemplate';
import Layout from '/components/coinMarket/Layout';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const ListScreen = ({}) => {

  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<MarketListSkeleton />}>
        <Layout />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default ListScreen;