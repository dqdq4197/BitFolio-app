import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Text from '/components/common/Text';
import RollingText from '/components/common/RollingText';
import { currencySymbol } from '/lib/utils';
import useLocales from '/hooks/useLocales';

const { width } = Dimensions.get('window');

type PricePerCoinViewProps = {
  fee: string;
  unMountingList: number[];
  height: number;
}

const SetFeeView = ({ 
  fee,
  unMountingList,
  height,
}: PricePerCoinViewProps) => {

  const { currency } = useLocales();

  return (
    <Container height={height}>
      <Text fontXL bold margin="0 5px 0 0">
        { currencySymbol(currency) }
      </Text>
      <RollingText 
        text={fee}
        unMountingList={unMountingList}
        fontXXXL
        bold
      />
    </Container>
  )
}

export default SetFeeView;

type ContainerType = {
  height: number;
}

const Container = styled.View<ContainerType>`
  flex-direction: row;
  width: ${ width }px;
  height: ${({ height }) => height }px;
  justify-content: center;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
`

const View = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`