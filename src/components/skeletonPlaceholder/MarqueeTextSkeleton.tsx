import React from 'react';
import { Dimensions } from 'react-native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Container from './common/Container';

const PADDING = 32;
const { width } = Dimensions.get('window');

const Item = () => {
  return (
    <Container>
      {/* <SkeletonPlaceholder.Item
        width={width - PADDING}
        height={40}
        borderRadius={6}
        marginTop={10}
      /> */}
    </Container>
  );
};

export default Item;
