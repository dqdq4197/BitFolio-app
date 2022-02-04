import React from 'react';
import { Dimensions } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Container } from './common';
import useGlobalTheme from '/hooks/useGlobalTheme';


const { width } = Dimensions.get('window');


const CoinDetailSkeleton = () => {
  const { theme: { content: { spacing } } } = useGlobalTheme();
  return (
    <>
      <Container>
        <SkeletonPlaceholder.Item paddingHorizontal={parseInt(spacing)} paddingVertical={15} >
          <SkeletonPlaceholder.Item height={38.5} width={200} borderRadius={6} />
          <SkeletonPlaceholder.Item height={19} width={149} marginTop={5} borderRadius={6} />
          <SkeletonPlaceholder.Item marginTop={30} height={280} width={width - parseInt(spacing) * 2} borderRadius={6} />
          <SkeletonPlaceholder.Item marginTop={20} width={width - parseInt(spacing) * 2} borderRadius={6} justifyContent="space-between" flexDirection="row">
            <SkeletonPlaceholder.Item height={30} width={36.5} borderRadius={6} />
            <SkeletonPlaceholder.Item height={30} width={36.5} borderRadius={6} />
            <SkeletonPlaceholder.Item height={30} width={36.5} borderRadius={6} />
            <SkeletonPlaceholder.Item height={30} width={36.5} borderRadius={6} />
            <SkeletonPlaceholder.Item height={30} width={36.5} borderRadius={6} />
            <SkeletonPlaceholder.Item height={30} width={36.5} borderRadius={6} />
            <SkeletonPlaceholder.Item height={30} width={36.5} borderRadius={6} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item marginTop={35} height={22} width={80} borderRadius={6} />
        </SkeletonPlaceholder.Item>
      </Container>
    </>
  )
}

export default CoinDetailSkeleton;