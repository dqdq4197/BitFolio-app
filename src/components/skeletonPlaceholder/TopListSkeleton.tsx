import React from 'react';
import { Dimensions } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Container, CoinItem } from './common';
import useGlobalTheme from '/hooks/useGlobalTheme';


const { width } = Dimensions.get('window');


const HighVolumeSkeleton = () => {
  const { theme: { content: { spacing } } } = useGlobalTheme();
  return (
    <>
      <Container>
        <SkeletonPlaceholder.Item paddingHorizontal={parseInt(spacing)} paddingVertical={20} >
          <SkeletonPlaceholder.Item height={30} width={130} borderRadius={6}/>
          <SkeletonPlaceholder.Item height={18} width={width - parseInt(spacing) * 2} marginTop={10} borderRadius={6}/>
          <SkeletonPlaceholder.Item height={18} width={width - parseInt(spacing) * 2} marginTop={5} borderRadius={6}/>
        </SkeletonPlaceholder.Item>
      </Container>
      <CoinItem/>
      <CoinItem/>
      <CoinItem/>
      <CoinItem/>
      <CoinItem/>
      <CoinItem/>
      <CoinItem/>
      <CoinItem/>
      <CoinItem/>
      <CoinItem/>
      <CoinItem/>
    </>
  )
}

export default HighVolumeSkeleton;