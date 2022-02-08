import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import HighVolume from '/components/coinMarket/popularList/HighVolume';
import TopListSkeleton from '/components/skeletonPlaceholder/TopListSkeleton';
import AsyncBoundary from '/components/common/AsyncBoundary';

const HighVolumeScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<TopListSkeleton />}>
        <HighVolume />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default HighVolumeScreen;
