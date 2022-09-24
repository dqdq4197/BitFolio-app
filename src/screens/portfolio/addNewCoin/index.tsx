import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import GeneralTemplate from '/components/GeneralTemplate';
import CoinHomeSkeleton from '/components/skeletonPlaceholder/CoinHomeSkeleton';
import AsyncBoundary from '/components/common/AsyncBoundary';
import Layout from '/components/portfolio/addNewCoin';

const AddNewCoinScreen = ({ navigation }: StackScreenProps<any>) => {
  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<></>}>
        <Layout />
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default AddNewCoinScreen;
