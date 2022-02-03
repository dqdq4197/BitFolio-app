import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';
import Login from '/components/auth/Login'; 

const LoginScreen = () => {
  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<CoinDetailSkeleton/>} >
        <Login />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default LoginScreen;