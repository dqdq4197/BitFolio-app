import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';
import ForgotPassword from '/components/auth/ForgotPassword';

const ForgotPasswordScreen = () => {
  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<CoinDetailSkeleton />}>
        <ForgotPassword />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  );
};

export default ForgotPasswordScreen;
