import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Text from '/components/common/Text';
import RollingText from '/components/common/RollingText';
import { FocusedView } from './FormModal';
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat';
import useLocales from '/hooks/useLocales';

const { width } = Dimensions.get('window');

type QuantityViewProps = {
  quantity: string;
  unMountingList: number[];
  symbol: string;
  pricePerCoin: string;
  onSwitchFocusView: (key: FocusedView) => void;
  height: number;
}
const SetQuantityView = ({ 
  quantity, 
  unMountingList, 
  symbol,
  pricePerCoin,
  onSwitchFocusView,
  height,
}: QuantityViewProps) => {
  const { currency } = useLocales();

  return (
    <Container height={height}>
      <TotalPriceView>
        <Text bold color100 fontML>
          Total Price
        </Text>
        <Text margin="5px 0 0 0">
          { currencyFormat({ value: parseFloat(pricePerCoin) * parseFloat(quantity), zeroMask: '0', prefix: getCurrencySymbol(currency) }) }
        </Text>
      </TotalPriceView>
      <View>
        <QuantityView>
          <RollingText 
            text={quantity}
            unMountingList={unMountingList}
            fontXXXL
            bold
          />
          <Text fontL bold margin="0 0 8px 10px">
            { symbol.toUpperCase() }
          </Text>
        </QuantityView>
        <PricePerCoinView
          activeOpacity={0.6}
          onPress={() => onSwitchFocusView('pricePerCoin')}
        >
          <Text fontML>
            { currencyFormat({ value: pricePerCoin, zeroMask: '0', prefix: getCurrencySymbol(currency) }) } per coin
          </Text>
        </PricePerCoinView>
      </View>
      <View />
    </Container>
  )
}

export default SetQuantityView;

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
const QuantityView = styled.View`
  flex-direction: row;
  align-items: center;
`

const TotalPriceView = styled.View`
  align-items: center;
`

const PricePerCoinView = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.base.background[300]};
  padding: 5px 8px;
  margin-top: 5px;
  border-radius: ${({ theme }) => theme.border.m};
`
const View = styled.View`
  align-items: center;
`