import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import GeneralTemplate from '/components/GeneralTemplate';
import CoinHomeSkeleton from '/components/skeletonPlaceholder/CoinHomeSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';
import AddTrack from '../../../components/portfolio/addTrack/index';

const AddTrackScreen = ({ navigation }: StackScreenProps<any>) => {

  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<CoinHomeSkeleton />}>
        <AddTrack />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default AddTrackScreen;
