import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';
import ChangePassword from '/components/auth/ChangePassword'; 

const ChangePasswordScreen = () => {
  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<CoinDetailSkeleton/>} >
        <ChangePassword />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default ChangePasswordScreen;