import React from 'react';
import GeneralTemplate from '/components/GeneralTemplate';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';
import Overview from '/components/news/Overview';


const OverviewScreen = () => {

  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<CoinDetailSkeleton/>} >
        <Overview />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default OverviewScreen;