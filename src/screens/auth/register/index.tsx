import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';
import Register from '/components/auth/Register';

const RegisterScreen = () => {
  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<CoinDetailSkeleton />}>
        <Register />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  );
};

export default RegisterScreen;
