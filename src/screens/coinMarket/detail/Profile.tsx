import React from 'react';
import ProfileLayout from '/components/coinMarketDetail/profile/Layout';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';


const Profile = () => {
  return (
    <ErrorBoundaryAndSuspense skeleton={<MarketListSkeleton/>} >
      <ProfileLayout/>
    </ErrorBoundaryAndSuspense>

  )
}

export default Profile;