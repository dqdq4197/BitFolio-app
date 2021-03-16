import React from 'react';
import { View, Dimensions } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


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
  <>
    <SkeletonPlaceholder 
      backgroundColor='#1B1B1B' 
      highlightColor='#242424'
    >
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
    </SkeletonPlaceholder>
  </>  
)

export default MarketListSkeleton;