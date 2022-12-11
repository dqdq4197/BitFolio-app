import React from 'react';

import ProfileLayout from '/components/coinMarketDetail/profile/Layout';
import AsyncBoundary from '/components/common/AsyncBoundary';

const Profile = () => {
  return (
    <AsyncBoundary skeleton={<></>}>
      <ProfileLayout />
    </AsyncBoundary>
  );
};

export default Profile;
