import React from 'react';

import Login from '/components/auth/Login';
import AsyncBoundary from '/components/common/AsyncBoundary';
import GeneralTemplate from '/components/GeneralTemplate';

const LoginScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<></>}>
        <Login />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default LoginScreen;
