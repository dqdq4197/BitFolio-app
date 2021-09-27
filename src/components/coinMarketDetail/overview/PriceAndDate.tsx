import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { useAppSelector, shallowEqual } from '/hooks/useRedux';
import useMarketLineChartData from '/hooks/useMarketLineChartData';
import { digitToFixed } from '/lib/utils';
import { AddSeparator, exponentToNumber } from '/lib/utils/currencyFormat';
import { getOnlyDecimal, getCurrencySymbol } from '/lib/utils/currencyFormat';
import Text from '/components/common/Text';
import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue';
import DateFormatText from '/components/common/DateFormatText';

const DATE_HEIGHT = 20;

interface PriceAndDetailProsp {
  id: string
  lastUpdatedPrice: number
  lastUpdatedDate: string
  percentage_24h?: number
}

const PriceAndDate = ({ id, lastUpdatedPrice, lastUpdatedDate, percentage_24h }: PriceAndDetailProsp) => {
  const { data } = useMarketLineChartData({ id });
  const { datum, currency, chartTimeFrame } = useAppSelector(state => ({
    datum: state.marketDetailReducer.datum,
    currency: state.baseSettingReducer.currency,
    chartTimeFrame: state.baseSettingReducer.chartTimeFrame
    }),
    shallowEqual
  );
  const [isCursorActive, setIsCursorActive] = useState(false);
  const translateY = useRef(new Animated.Value(-DATE_HEIGHT)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // console.log(exponentToNumber(datum.y))
  // console.log(getOnlyDecimal({ value: exponentToNumber(datum.y), minLength: 2 }))
  useEffect(() => {
    if(datum.y !== 0 && !isCursorActive) {
      setIsCursorActive(true);

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(opacity ,{
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    }

    if(datum.y === 0 && isCursorActive) {
      setIsCursorActive(false);
      
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -DATE_HEIGHT,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(opacity ,{
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [datum])

  const date = useMemo(() => {
    return datum.x || Date.parse(lastUpdatedDate);
  }, [datum, lastUpdatedDate])


  const percentage = useMemo(() => {
    if(!data) return 0;

    if(chartTimeFrame === 1 && percentage_24h) {
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
          <DateFormatText 
            date={date}
            formatType="Pp"
            margin="5px 0 0 0"
            bold
          />
          <Text bold color100 fontML>
            { id.charAt(0).toUpperCase() + id.slice(1) }
          </Text>
        </Animated.View>
      </ AnimatedView>
      <Row>
        <PriceWrap>
          <Text style={{textAlignVertical: 'bottom'}} fontL heavy color100 margin="0 5px 0 0" bold>
            { getCurrencySymbol(currency) }
          </Text>
          <Text fontXL heavy color100 style={{ transform: [{ translateY: 3 }]}}>
            { AddSeparator(Math.floor(datum.y || lastUpdatedPrice)) }.
          </Text>
          <Text fontML color100 heavy>
            { 
              datum.y !== 0
                ? getOnlyDecimal({ 
                    value: exponentToNumber(datum.y), 
                    minLength: 2, 
                    noneZeroCnt: exponentToNumber(datum.y) < 1 ? 3 : 2 
                  })
                : getOnlyDecimal({ 
                    value: exponentToNumber(lastUpdatedPrice), 
                    minLength: 2, 
                    noneZeroCnt: exponentToNumber(lastUpdatedPrice) < 1 ? 3 : 2
                  })
            }
          </Text>
        </PriceWrap>
        <PercentageWrap>
          { data !== undefined
            ? <IncreaseDecreaseValue
                heavy 
                fontML
                value={ digitToFixed(percentage, 2) }
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

const Container = styled.View`
  padding: 0 ${({theme}) => theme.content.spacing};
`
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  min-height: 25px;
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
  height: ${ DATE_HEIGHT }px;
`