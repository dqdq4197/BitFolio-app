import { useNavigation } from '@react-navigation/native';
import React from 'react';

import AsyncBoundary from '/components/common/AsyncBoundary';
import GeneralTemplate from '/components/GeneralTemplate';

/**
 * @Deprecated
 */
const Auth = () => {
  const navigation = useNavigation();

  return (
    <GeneralTemplate>
      <AsyncBoundary>
        {/* <Text fontX onPress={() => navigation.navigate('Login')}>
          로그인하러 가기
        </Text>
        <Text fontX onPress={() => navigation.navigate('Language')}>
          Language
        </Text> */}
      </AsyncBoundary>
    </GeneralTemplate>
  );
};

export default Auth;
