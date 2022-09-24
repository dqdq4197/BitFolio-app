import React from 'react';

import AsyncBoundary from '/components/common/AsyncBoundary';
import ProfileLayout from '/components/coinMarketDetail/profile/Layout';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';

const Profile = () => {
  return (
    <AsyncBoundary skeleton={<></>}>
      <ProfileLayout />
    </AsyncBoundary>
  );
};

export default Profile;
