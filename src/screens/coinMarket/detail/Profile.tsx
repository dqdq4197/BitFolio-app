import React from 'react';

import ProfileLayout from '/components/coinMarketDetail/profile/Layout';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const Profile = () => {
  return (
    <ErrorBoundaryAndSuspense skeleton={<CoinDetailSkeleton />}>
      <ProfileLayout />
    </ErrorBoundaryAndSuspense>
  );
};

export default Profile;
