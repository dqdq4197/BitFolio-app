import React from 'react';

import ChangePassword from '/components/auth/ChangePassword';
import AsyncBoundary from '/components/common/AsyncBoundary';
import GeneralTemplate from '/components/GeneralTemplate';

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
