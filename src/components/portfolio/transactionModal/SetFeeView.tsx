import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Text from '/components/common/Text';

const { width } = Dimensions.get('window');

type FeeViewProps = {
  height: number;
  fee: string;
  unMountingList: number[];
}

const SetFeeView = ({ 
  height,
  fee,
  unMountingList
}: FeeViewProps) => {

  return (
    <Container height={height}>
      <Text color100 fontXL>
        Fee
      </Text>
    </Container>
  )
}

export default SetFeeView;

type ContainerType = {
  height: number;
}

const Container = styled.View<ContainerType>`
  width: ${ width }px;
  justify-content: space-around;
  align-items: center;
  height: ${({ height }) => height }px;
  padding: 0 ${({ theme }) => theme.content.spacing};
`