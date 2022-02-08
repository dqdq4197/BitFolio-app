import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import AsyncBoundary from '/components/common/AsyncBoundary';
import Login from '/components/auth/Login';

const LoginScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<CoinDetailSkeleton />}>
        <Login />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default LoginScreen;
