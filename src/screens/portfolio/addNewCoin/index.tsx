import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import GeneralTemplate from '/components/GeneralTemplate';
import CoinHomeSkeleton from '/components/skeletonPlaceholder/CoinHomeSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';
import Layout from '/components/portfolio/addNewCoin';

const AddNewCoinScreen = ({ navigation }: StackScreenProps<any>) => {
  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<CoinHomeSkeleton />}>
        <Layout />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  );
};

export default AddNewCoinScreen;
