import React from 'react';
import { Dimensions } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Container } from './common';

const { width } = Dimensions.get('window');
const PADDING = 32; 
const MarketListSkeleton = () => {
  return (
    <>
      <Row/>
      <Row/>
      <Row/>
    </>
  )
}

const Row = () => (
  <Container>
    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
      <SkeletonPlaceholder.Item marginLeft={20}>
        <SkeletonPlaceholder.Item width={width - PADDING} height={20} borderRadius={4} />
        <SkeletonPlaceholder.Item
          marginTop={6}
          width={width - PADDING}
          height={20}
          borderRadius={4}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </Container>
)

export default MarketListSkeleton;