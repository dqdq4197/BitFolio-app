import React from 'react';
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const MarketListSkeleton = () => {
  return (
    <SkeletonPlaceholder 
      backgroundColor='#1B1B1B' 
      highlightColor='#242424'
    >
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={200} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={200}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

export default MarketListSkeleton;