import React from 'react';
import { useAppSelector } from '/hooks/useRedux';
import Text from '/components/common/Text';
import useCurrencyFormat from '/hooks/useCurrencyFormat';
import timestampToDate from '/lib/utils/timestampToDate';
import styled from 'styled-components/native';
import getOnlyDecimal from '/lib/utils/getOnlyDecimal';

interface PriceAndDetailProsp {
  id: string,
  currentPrice: number,
}
const PriceAndDetail = ({ id, currentPrice }: PriceAndDetailProsp) => {

  const { datum } = useAppSelector(state => state.marketDetailReducer);
  const price = useCurrencyFormat(Math.floor(datum.y) || currentPrice);

  return (
    <Container>
      <Text fontXXL>
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </Text>
      <PriceWrap>
        <Text fontXL>
          {price}
        </Text>
        <Text fontML>
          {getOnlyDecimal(datum.y, 2) && '.' + getOnlyDecimal(datum.y, 2)}
        </Text>
      </PriceWrap>
      <Text>
        {timestampToDate(datum.x)}
      </Text>
    </Container>
  )
}

export default PriceAndDetail


const Container = styled.View`
  padding: 0 ${({theme}) => theme.content.spacing};
`
const PriceWrap = styled.View`
  flex-direction: row;
  align-items: flex-end;
`