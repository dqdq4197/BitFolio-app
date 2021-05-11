import React from 'react';
import { useAppSelector } from '/hooks/useRedux';
import Text from '/components/common/Text';
import {
  currencySymbol,
  getOnlyDecimal,
  timestampToDate
} from '/lib/utils';
import useCurrencyFormat from '/hooks/useCurrencyFormat';
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

  const price = useCurrencyFormat(Math.floor(datum.y) || Math.floor(lastUpdatedPrice), false);
  const date = datum.x || Date.parse(lastUpdatedDate);
  
  return (
    <Container>
      <DetailView>
        <PriceWrap>
          <Text fontXL margin="0 5px 0 0" bold>
            { currencySymbol(currency) }
          </Text>
          <Text fontXXL bold>
            { price }
          </Text>
          <Text fontML margin="0 0 4px 0" bold>
            { 
              datum.y === 0
              ? getOnlyDecimal(lastUpdatedPrice, 2) && '.' + getOnlyDecimal(lastUpdatedPrice, 2)
              : getOnlyDecimal(datum.y, 2) && '.' + getOnlyDecimal(datum.y, 2)
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