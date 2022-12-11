import React from 'react';

import AsyncBoundary from '/components/common/AsyncBoundary';
import DiscussionHome from '/components/discussionHome';
import GeneralTemplate from '/components/GeneralTemplate';

const HomeScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<></>}>
        <DiscussionHome />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default HomeScreen;
