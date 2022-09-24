import React from 'react';
import { Dimensions, View } from 'react-native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import useGlobalTheme from '/hooks/useGlobalTheme';

import { Container } from './common';

const { width } = Dimensions.get('window');

const Item = () => {
  const {
    theme: {
      content: { spacing },
    },
  } = useGlobalTheme();

  return (
    <Container>
      {/* <SkeletonPlaceholder.Item
        paddingHorizontal={parseInt(spacing, 10)}
        flexDirection="row"
        justifyContent="space-between"
        height={60}
        width={width}
        alignItems="center"
      >
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item
            width={30}
            height={30}
            borderRadius={25}
            marginRight={10}
          />
          <View>
            <SkeletonPlaceholder.Item
              width={100}
              height={13}
              borderRadius={6}
              marginBottom={10}
            />
            <SkeletonPlaceholder.Item width={60} height={10} borderRadius={6} />
          </View>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={40} height={13} borderRadius={9} />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item width={width} height={1} /> */}
    </Container>
  );
};
const SearchItemListSkeleton = () => {
  return (
    <>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </>
  );
};

export default SearchItemListSkeleton;
