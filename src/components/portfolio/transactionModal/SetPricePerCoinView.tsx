import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import Text from '/components/common/Text';
import RollingText from '/components/common/RollingText';
import { getCurrencySymbol } from '/lib/utils/currencyFormat';
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
      <View />
      <PriceView height={height}>
        <Text fontXL bold margin="0 5px 0 0">
          {getCurrencySymbol(currency)}
        </Text>
        <View>
          <RollingText
            text={pricePerCoin}
            unMountingList={unMountingList}
            fontXXXL
            bold
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
        <Circle isPriceFixed={isPriceFixed} />
        <CustomText
          isPriceFixed={isPriceFixed}
          fontL
        >
          {t(`portfolio.fixing the price`)}
        </CustomText>
      </PriceFixedButton>
    </Container>
  )
}

export default SetPricePerCoinView;

type HeightProps = {
  height: number;
}

type PriceFixedProps = {
  isPriceFixed: boolean;
}

const Container = styled.View<HeightProps>`
  width: ${width}px;
  height: ${({ height }) => height}px;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
`

const PriceView = styled.View<HeightProps>`
  flex-direction: row;
  align-items: center;
  height: ${({ height }) => height - 60}px;
`

const PriceFixedButton = styled.TouchableOpacity<PriceFixedProps>`
  flex-direction: row;
  height: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${({ isPriceFixed, theme }) => isPriceFixed
    ? 'rgb(77, 81, 100)'
    : theme.base.background[400]};
  border-radius: ${({ theme }) => theme.border.m};
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

const CustomText = styled(Text) <PriceFixedProps>`
  color: ${({ theme, isPriceFixed }) => isPriceFixed
    ? theme.dark
      ? theme.base.text[100]
      : theme.base.dark100
    : theme.base.text[200]
  }
`