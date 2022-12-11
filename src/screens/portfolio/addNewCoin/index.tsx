import React from 'react';

import AsyncBoundary from '/components/common/AsyncBoundary';
import GeneralTemplate from '/components/GeneralTemplate';
import Layout from '/components/portfolio/addNewCoin';

const AddNewCoinScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary>
        <Layout />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default AddNewCoinScreen;
