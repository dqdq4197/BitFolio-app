import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import DiscussionHome from '/components/discussionHome';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import AsyncBoundary from '/components/common/AsyncBoundary';

const HomeScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<></>}>
        <DiscussionHome />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default HomeScreen;
