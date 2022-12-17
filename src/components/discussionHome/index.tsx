import { useNavigation } from '@react-navigation/native';
import React from 'react';

import Text from '/components/common/Text';

/**
 * @Deprecated
 */
const DiscussionHome = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    // navigation.navigate('Editor');
  };

  return (
    <Text color100 bold fontXXL onPress={handleButtonPress}>
      작성하기
    </Text>
  );
};

export default DiscussionHome;
