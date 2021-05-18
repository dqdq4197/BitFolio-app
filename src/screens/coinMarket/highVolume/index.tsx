import React from 'react';
import GeneralTemplate from '/components/GeneralTemplate';
import HighVolume from '/components/coinMarket/popularList/HighVolume';
import TopListSkeleton from '/components/skeletonPlaceholder/TopListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const HighVolumeScreen = ({}) => {

  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<TopListSkeleton />}>
        <HighVolume />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default HighVolumeScreen;