import React from 'react';
import { Dimensions } from 'react-native';

import useGlobalTheme from '/hooks/useGlobalTheme';

import SkeletonPlaceholder from '.';

const { width } = Dimensions.get('window');

const MarketListSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <Row />
      <Row />
      <Row />
    </SkeletonPlaceholder>
  );
};

const Row = () => {
  const { theme } = useGlobalTheme();
  const spacing = parseInt(theme.content.spacing, 10);

  return (
    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
      <SkeletonPlaceholder.Item marginLeft={20}>
        <SkeletonPlaceholder.Item
          width={width - spacing * 2}
          height={20}
          borderRadius={4}
        />
        <SkeletonPlaceholder.Item
          marginTop={6}
          width={width - spacing * 2}
          height={20}
          borderRadius={4}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  );
};

export default MarketListSkeleton;
