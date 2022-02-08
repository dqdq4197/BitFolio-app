import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import AsyncBoundary from '/components/common/AsyncBoundary';
import ForgotPassword from '/components/auth/ForgotPassword';

const ForgotPasswordScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<CoinDetailSkeleton />}>
        <ForgotPassword />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default ForgotPasswordScreen;
