import React from 'react';

import GeneralTemplate from '/components/GeneralTemplate';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import AsyncBoundary from '/components/common/AsyncBoundary';
import Register from '/components/auth/Register';

const RegisterScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<></>}>
        <Register />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default RegisterScreen;
