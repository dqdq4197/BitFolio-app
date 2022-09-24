import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import AsyncBoundary from '/components/common/AsyncBoundary';
import ChangePassword from '/components/auth/ChangePassword';

const ChangePasswordScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<></>}>
        <ChangePassword />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default ChangePasswordScreen;
