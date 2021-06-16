import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Text from '/components/common/Text';
import RollingText from '/components/common/RollingText';
import useCurrencyFormat from '/hooks/useCurrencyFormat';
import { FocusedView } from './FormModal';

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
  height
}: QuantityViewProps) => {

  const price = useCurrencyFormat(parseFloat(pricePerCoin));
  const totalPrice = useCurrencyFormat(parseFloat(pricePerCoin) * parseFloat(quantity));

  return (
    <Container height={height}>
      <TotalPriceView>
        <Text bold color100 fontML>
          Total Price
        </Text>
        <Text margin="5px 0 0 0">
          { totalPrice }
        </Text>
      </TotalPriceView>
      <View>
        <QuantityView>
          <RollingText 
            text={quantity}
            unMountingList={unMountingList}
            textStyleProps={{
              color100: true,
              fontXXXL: true,
              bold: true,
            }}
          />
          <Text fontX bold margin="0 0 8px 10px">
            { symbol.toUpperCase() }
          </Text>
        </QuantityView>
        <PricePerCoinView
          activeOpacity={0.6}
          onPress={() => onSwitchFocusView('pricePerCoin')}
        >
          <Text fontML>
            { price } per coin
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
  align-items: flex-end;
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