import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Text from '/components/common/Text';
import RollingText from '/components/common/RollingText';
import { currencySymbol } from '/lib/utils';
import useLocales from '/hooks/useLocales';

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

  const { currency } = useLocales();

  return (
    <Container height={height}>
      <Text fontXL bold margin="0 5px 0 0">
        { currencySymbol(currency) }
      </Text>
      <View>
        <RollingText 
          text={pricePerCoin}
          unMountingList={unMountingList}
          textStyleProps={{
            color100: true,
            fontXXXL: true,
            bold: true,
          }}
        />
        <Text fontML bold margin="0 0 10px 5px">
          per coin
        </Text>
      </View>
    </Container>
  )
}

export default SetPricePerCoinView;

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