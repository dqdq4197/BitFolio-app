import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import AsyncBoundary from '/components/common/AsyncBoundary';
import Text from '/components/common/Text';
import GeneralTemplate from '/components/GeneralTemplate';

const Auth = ({ navigation }: StackScreenProps<any>) => {

  return (
    <GeneralTemplate>
      <AsyncBoundary skeleton={<></>}>
        <Text fontX onPress={() => navigation.navigate('Login')}>
          로그인하러 가기
        </Text>
        <Text fontX onPress={() => navigation.navigate('Language')}>
          Language
        </Text>
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default Auth;
