import React from 'react';

import Register from '/components/auth/Register';
import AsyncBoundary from '/components/common/AsyncBoundary';
import GeneralTemplate from '/components/GeneralTemplate';

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
