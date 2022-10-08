import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import AsyncBoundary from '/components/common/AsyncBoundary';
import EmailVerification from '/components/auth/EmailVerification';

const EmailVerificationScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<CoinDetailSkeleton />}>
        <EmailVerification />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default EmailVerificationScreen;
