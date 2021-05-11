import React from 'react';
import { Dimensions } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ItemSkeleton from './ItemSkeleton';

const { width } = Dimensions.get('window');
const PADDING = 16; 



const HighVolumeSkeleton = () => {
  
  return (
    <>
      <SkeletonPlaceholder 
        backgroundColor='#1B1B1B' 
        highlightColor='#242424'
        >
        <SkeletonPlaceholder.Item paddingHorizontal={PADDING} paddingVertical={20} >
          <SkeletonPlaceholder.Item height={30} width={130} borderRadius={6}/>
          <SkeletonPlaceholder.Item height={18} width={width - PADDING * 2} marginTop={10} borderRadius={6}/>
          <SkeletonPlaceholder.Item height={18} width={width - PADDING * 2} marginTop={5} borderRadius={6}/>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <ItemSkeleton/>
      <ItemSkeleton/>
      <ItemSkeleton/>
      <ItemSkeleton/>
      <ItemSkeleton/>
      <ItemSkeleton/>
      <ItemSkeleton/>
    </>
  )
}

export default HighVolumeSkeleton;