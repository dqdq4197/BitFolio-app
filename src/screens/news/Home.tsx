import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import DiscussionHome from '/components/discussionHome';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const HomeScreen = () => {
  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<CoinDetailSkeleton />}>
        <DiscussionHome />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  );
};

export default HomeScreen;
