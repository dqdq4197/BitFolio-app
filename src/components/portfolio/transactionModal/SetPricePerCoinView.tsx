import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Text from '/components/common/Text';
import RollingText from '/components/common/RollingText';

const { width } = Dimensions.get('window');

type PricePerCoinViewProps = {
  pricePerCoin: string;
  unMountingList: number[];
  height: number;
}

const SetPricePerCoinView = ({ 
  pricePerCoin,
  unMountingList,
  height,
}: PricePerCoinViewProps) => {

  return (
    <Container height={height}>
      <RollingText 
        text={pricePerCoin}
        unMountingList={unMountingList}
        textStyleProps={{
          color100: true,
          fontXXXL: true,
          bold: true,
        }}
      />
    </Container>
  )
}

export default SetPricePerCoinView;

type ContainerType = {
  height: number;
}

const Container = styled.View<ContainerType>`
  width: ${ width }px;
  height: ${({ height }) => height }px;
  justify-content: space-around;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
`