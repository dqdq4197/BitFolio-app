import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import Text from '/components/common/Text';
import RollingText from '/components/common/RollingText';
import { currencySymbol } from '/lib/utils';
import useLocales from '/hooks/useLocales';

const { width } = Dimensions.get('window');

type PricePerCoinViewProps = {
  pricePerCoin: string
  unMountingList: number[]
  height: number
  isPriceFixed: boolean
  onIsPriceFiexedChange: () => void;
}

const SetPricePerCoinView = ({ 
  pricePerCoin,
  unMountingList,
  height,
  isPriceFixed,
  onIsPriceFiexedChange
}: PricePerCoinViewProps) => {
  const { t } = useTranslation();
  const { currency } = useLocales();

  return (
    <Container height={height}>
      <PriceView>
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
      </PriceView>
      <PriceFixedButton 
        activeOpacity={0.6} 
        isPriceFixed={isPriceFixed}
        onPress={onIsPriceFiexedChange}
      >
        <Circle isPriceFixed={isPriceFixed}/>
        <Text fontL color100>
          { t(`portfolio.fixing the price`) }
        </Text>
      </PriceFixedButton>
    </Container>
  )
}

export default SetPricePerCoinView;

type ContainerType = {
  height: number;
}

type PriceFixedProps = {
  isPriceFixed: boolean;
}

const Container = styled.View<ContainerType>`
  width: ${ width }px;
  height: ${({ height }) => height }px;
  justify-content: center;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
`

const PriceView = styled.View`
  flex-direction: row;
  
`

const PriceFixedButton = styled.TouchableOpacity<PriceFixedProps>`
  position: absolute;
  bottom: 10px;
  height: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ isPriceFixed, theme }) => isPriceFixed ? 'rgb(77, 81, 100)' : theme.base.background[400]};
  border-radius: ${({ theme }) => theme.border.m };
  padding: 5px 10px;
`

const Circle = styled.View<PriceFixedProps>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${({ isPriceFixed, theme }) => isPriceFixed ? theme.base.primaryColor : 'rgb(119, 120, 122)'};
  margin-right: 8px;
`

const View = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`