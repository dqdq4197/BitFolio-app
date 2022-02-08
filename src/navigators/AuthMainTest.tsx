import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Text from '/components/common/Text';
import GeneralTemplate from '/components/GeneralTemplate';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import AsyncBoundary from '/components/common/AsyncBoundary';

const Auth = () => {
  const navigation = useNavigation();

  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<CoinDetailSkeleton />}>
        <Text fontX onPress={() => navigation.navigate('Login')}>
          {/* 로그인하러 가기 */}
        </Text>
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default Auth;
