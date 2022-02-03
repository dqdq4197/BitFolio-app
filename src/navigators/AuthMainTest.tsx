import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Text from '/components/common/Text';
import GeneralTemplate from '/components/GeneralTemplate';
import CoinDetailSkeleton from '/components/skeletonPlaceholder/CoinDetailSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const Auth = () => {
  
  const navigation = useNavigation();
  
      return (
      <GeneralTemplate>
        <ErrorBoundaryAndSuspense skeleton={<CoinDetailSkeleton/>} >
          <Text fontX onPress={() => navigation.navigate('Login')}>
            로그인하러 가기 
          </Text>
        </ErrorBoundaryAndSuspense>
      </GeneralTemplate>
    )
  }
  
  export default Auth;