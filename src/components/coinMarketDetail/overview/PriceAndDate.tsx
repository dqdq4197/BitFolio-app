import React from 'react';
import { useAppSelector } from '/hooks/useRedux';
import Text from '/components/common/Text';
import { timestampToDate } from '/lib/utils';
import { AddSeparator } from '/lib/utils/currencyFormat';
import { getOnlyDecimal, getCurrencySymbol } from '/lib/utils/currencyFormat';
import styled from 'styled-components/native';
import { shallowEqual } from '/hooks/useRedux';

interface PriceAndDetailProsp {
  lastUpdatedPrice: number,
  lastUpdatedDate: string,
}

const PriceAndDate = ({ lastUpdatedPrice, lastUpdatedDate }: PriceAndDetailProsp) => {
  const { datum, currency } = useAppSelector(state => ({
    datum: state.marketDetailReducer.datum,
    currency: state.baseSettingReducer.currency,
    }),
    shallowEqual
  );
  const date = datum.x || Date.parse(lastUpdatedDate);
  
  return (
    <Container>
      <DetailView>
        <PriceWrap>
          <Text fontXL margin="0 5px 0 0" bold>
            { getCurrencySymbol(currency) }
          </Text>
          <Text fontXXL bold>
            { AddSeparator(Math.floor(datum.y || lastUpdatedPrice)) }.
          </Text>
          <Text fontML margin="0 0 4px 0" bold>
            { 
              datum.y === 0
              ? getOnlyDecimal({ value: lastUpdatedPrice, minLength: 2 })
              : getOnlyDecimal({ value: datum.y, minLength: 2 })
            }
          </Text>
        </PriceWrap>
        <Text fontML color400>
          { timestampToDate(date) }
        </Text>
      </DetailView>
    </Container>
  )
}

export default PriceAndDate;

const Container = styled.View`
  padding: 0 ${({theme}) => theme.content.spacing};
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
`
const DetailView = styled.View`
  justify-content: space-between;
`

const PriceWrap = styled.View`
  flex-direction: row;
  align-items: flex-end;
`