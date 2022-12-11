import React from 'react';

import Layout from '/components/coinSearch/Layout';
import AsyncBoundary from '/components/common/AsyncBoundary';
import GeneralTemplate from '/components/GeneralTemplate';

const SearchScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<></>}>
        <Layout />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default SearchScreen;
