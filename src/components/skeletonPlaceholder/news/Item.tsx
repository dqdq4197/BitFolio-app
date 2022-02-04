import React from 'react';
import { Dimensions, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Container } from '../common';
import useGlobalTheme from '/hooks/useGlobalTheme';


const { width } = Dimensions.get('window');

const CoinDetailSkeleton = () => {
  const { theme } = useGlobalTheme();

  return (
    <>
      <Container>
        <SkeletonPlaceholder.Item paddingHorizontal={parseInt(theme.content.spacing)} paddingVertical={15} >
          <SkeletonPlaceholder.Item height={13} width={140} borderRadius={6} />
          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
            <View>
              <SkeletonPlaceholder.Item height={25} width={width - parseInt(theme.content.spacing) - 100} borderRadius={6} />
              <SkeletonPlaceholder.Item marginTop={10} height={25} width={width - parseInt(theme.content.spacing) - 100} borderRadius={6} />
            </View>
            <SkeletonPlaceholder.Item height={60} width={60} borderRadius={6} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <SkeletonPlaceholder.Item height={15} width={30} borderRadius={6} />
            <SkeletonPlaceholder.Item marginLeft={10} height={15} width={30} borderRadius={6} />
          </View>
          <SkeletonPlaceholder.Item marginTop={20} height={68} width={'100%'} borderRadius={6} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item paddingHorizontal={parseInt(theme.content.spacing)} paddingVertical={15} >
          <SkeletonPlaceholder.Item height={13} width={140} borderRadius={6} />
          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
            <View>
              <SkeletonPlaceholder.Item height={25} width={width - parseInt(theme.content.spacing) - 100} borderRadius={6} />
              <SkeletonPlaceholder.Item marginTop={10} height={25} width={width - parseInt(theme.content.spacing) - 100} borderRadius={6} />
            </View>
            <SkeletonPlaceholder.Item height={60} width={60} borderRadius={6} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <SkeletonPlaceholder.Item height={15} width={30} borderRadius={6} />
            <SkeletonPlaceholder.Item marginLeft={10} height={15} width={30} borderRadius={6} />
          </View>
          <SkeletonPlaceholder.Item marginTop={20} height={68} width={'100%'} borderRadius={6} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item paddingHorizontal={parseInt(theme.content.spacing)} paddingVertical={15} >
          <SkeletonPlaceholder.Item height={13} width={140} borderRadius={6} />
          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
            <View>
              <SkeletonPlaceholder.Item height={25} width={width - parseInt(theme.content.spacing) - 100} borderRadius={6} />
              <SkeletonPlaceholder.Item marginTop={10} height={25} width={width - parseInt(theme.content.spacing) - 100} borderRadius={6} />
            </View>
            <SkeletonPlaceholder.Item height={60} width={60} borderRadius={6} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <SkeletonPlaceholder.Item height={15} width={30} borderRadius={6} />
            <SkeletonPlaceholder.Item marginLeft={10} height={15} width={30} borderRadius={6} />
          </View>
          <SkeletonPlaceholder.Item marginTop={20} height={68} width={'100%'} borderRadius={6} />
        </SkeletonPlaceholder.Item>
      </Container>
    </>
  )
}

export default CoinDetailSkeleton;