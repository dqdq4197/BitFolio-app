import React, { useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import ReAnimated, { useDerivedValue } from "react-native-reanimated";
import { chartType } from 'base-types'
import { ReText } from "react-native-redash";
import styled from 'styled-components/native';

import { useAppSelector, shallowEqual } from '/hooks/useRedux';
import useMarketChart from '/hooks/data/useMarketChart';
import { digitToFixed } from '/lib/utils';
import { AddSeparator, exponentToNumber } from '/lib/utils/currencyFormat';
import { getOnlyDecimal, getCurrencySymbol } from '/lib/utils/currencyFormat';

import Text from '/components/common/Text';
import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue';

const DATE_HEIGHT = 20;

interface PriceAndDetailProsp {
  id: string
  lastUpdatedPrice: number
  percentage_24h?: number
  isCursorActive: boolean
  datumX: ReAnimated.SharedValue<string>
  datumY: ReAnimated.SharedValue<string[]>
  datumYChangePercentage: ReAnimated.SharedValue<string>
  percentageStatus: chartType.percentageStatus
}

const PriceAndDate = ({
  id,
  lastUpdatedPrice,
  percentage_24h,
  isCursorActive,
  datumX,
  datumY,
  datumYChangePercentage,
  percentageStatus
}: PriceAndDetailProsp) => {
  const { data } = useMarketChart({ id });
  const { currency, chartTimeFrame } = useAppSelector(state => ({
    currency: state.baseSettingReducer.currency,
    chartTimeFrame: state.baseSettingReducer.chartTimeFrame
  }),
    shallowEqual
  );
  const translateY = useRef(new Animated.Value(-DATE_HEIGHT)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const datumYInteger = useDerivedValue(() => `${datumY.value[0]}.`);
  const datumYDecimal = useDerivedValue(() => `${datumY.value[1]}`);
  const datumYChangePercentageWithSign = useDerivedValue(() => {
    return +datumYChangePercentage.value > 0
      ? '+' + datumYChangePercentage.value + '%'
      : datumYChangePercentage.value + '%'
  })

  useEffect(() => {
    if (isCursorActive) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -DATE_HEIGHT,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [isCursorActive])

  const percentage = useMemo(() => {
    if (!data) return 0;

    if (chartTimeFrame === 1 && percentage_24h) {
      return percentage_24h;
    }

    return (lastUpdatedPrice - data.prices[0][1]) / data.prices[0][1] * 100;
  }, [chartTimeFrame, data, percentage_24h])

  return (
    <Container>
      <AnimatedView>
        <Animated.View
          style={{
            transform: [{
              translateY
            }],
            opacity: 1
          }}
        >
          <DatumXText text={datumX} />
          <Text bold color100 fontML>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </Text>
        </Animated.View>
      </ AnimatedView>
      <Row>
        <PriceWrap>
          <Text style={{ textAlignVertical: 'bottom' }} fontL heavy color100 margin="0 5px 0 0" bold>
            {getCurrencySymbol(currency)}
          </Text>
          {
            isCursorActive
              ? <>
                <DatumYIntegerText text={datumYInteger} />
                <DatumYDecimalText text={datumYDecimal} />
              </>
              : <>
                <Text fontXL heavy color100 style={{ transform: [{ translateY: 3 }] }}>
                  {AddSeparator(Math.floor(lastUpdatedPrice))}.
                </Text>
                <Text fontML color100 heavy>
                  {
                    getOnlyDecimal({
                      value: exponentToNumber(lastUpdatedPrice),
                      minLength: 2,
                      noneZeroCnt: exponentToNumber(lastUpdatedPrice) < 1 ? 3 : 2
                    })
                  }
                </Text>
              </>
          }
        </PriceWrap>
        <PercentageWrap>
          {data !== undefined
            ? isCursorActive
              ? <DatumYChangePercentageText
                percentageStatus={percentageStatus}
                text={datumYChangePercentageWithSign}
              />
              : <IncreaseDecreaseValue
                heavy
                fontML
                value={digitToFixed(percentage, 2)}
                afterPrefix="%"
              />
            : <Text> -- </Text>
          }
        </PercentageWrap>
      </Row>
    </Container>
  )
}

export default PriceAndDate;

type PercentageTextProps = {
  percentageStatus: chartType.percentageStatus
}
const Container = styled.View`
  padding: 0 ${({ theme }) => theme.content.spacing};
`
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  min-height: 25px;
`

const DatumXText = styled(ReText)`
  font-size: ${({ theme }) => theme.size.font_m};
  color: ${({ theme }) => theme.base.text[200]};
  font-weight: bold;
  margin-top: 5px;
`

const DatumYIntegerText = styled(ReText)`
  font-size: ${({ theme }) => theme.size.font_xl};
  font-weight: 700;
  color: ${({ theme }) => theme.base.text[100]};
  transform: translateY(3px);
`

const DatumYDecimalText = styled(ReText)`
  font-size: ${({ theme }) => theme.size.font_ml};
  font-weight: 700;
  color: ${({ theme }) => theme.base.text[100]};
  `

const DatumYChangePercentageText = styled(ReText) <PercentageTextProps>`
  font-size: ${({ theme }) => theme.size.font_ml};
  font-weight: 700;
  color: ${({ percentageStatus, theme }) => (
    percentageStatus === 'negative'
      ? theme.base.downColor
      : percentageStatus === 'positive'
        ? theme.base.upColor
        : theme.base.text[200]
  )};
`

const PriceWrap = styled.View`
  flex-direction: row;
  align-items: flex-end;
`

const PercentageWrap = styled.View`
  padding: 5px 8px;
  border-radius: ${({ theme }) => theme.border.m};
  background-color: ${({ theme }) => theme.base.background[300]};
`

const AnimatedView = styled.View`
  overflow: hidden;
  height: ${DATE_HEIGHT}px;
`