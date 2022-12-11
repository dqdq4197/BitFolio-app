import React from 'react';

import ForgotPassword from '/components/auth/ForgotPassword';
import AsyncBoundary from '/components/common/AsyncBoundary';
import GeneralTemplate from '/components/GeneralTemplate';

const ForgotPasswordScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<></>}>
        <ForgotPassword />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default ForgotPasswordScreen;
