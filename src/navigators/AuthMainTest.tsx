import { useNavigation } from '@react-navigation/native';
import React from 'react';

import AsyncBoundary from '/components/common/AsyncBoundary';
import Text from '/components/common/Text';
import GeneralTemplate from '/components/GeneralTemplate';

const Auth = () => {
  const navigation = useNavigation();

  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<></>}>
        <Text fontX onPress={() => navigation.navigate('Login')}>
          {/* 로그인하러 가기 */}
        </Text>
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default Auth;
