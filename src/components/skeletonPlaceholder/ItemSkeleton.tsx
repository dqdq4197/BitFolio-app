import React from 'react';
import { Dimensions, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const PADDING = 16; 
const { width } = Dimensions.get('window');

const Item = () => {
  return (
    <SkeletonPlaceholder 
    backgroundColor='#1B1B1B' 
    highlightColor='#242424'>
      <SkeletonPlaceholder.Item 
        paddingHorizontal={PADDING} 
        flexDirection="row" 
        justifyContent='space-between'
        height={60} 
        width={width}
        alignItems='center'
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SkeletonPlaceholder.Item width={15} height={20} marginRight={20} borderRadius={6}/>
          <SkeletonPlaceholder.Item width={30} height={30} borderRadius={25} marginRight={10}/>
          <View>
            <SkeletonPlaceholder.Item width={70} height={13} marginBottom={10}/>
            <SkeletonPlaceholder.Item width={40} height={10} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <SkeletonPlaceholder.Item width={60} height={20} marginRight={20} />
          <SkeletonPlaceholder.Item width={40} height={40} borderRadius={20} justifyContent='flex-end'/>
        </View>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item width={width} height={1} />
    </SkeletonPlaceholder> 
  )
}

export default Item;