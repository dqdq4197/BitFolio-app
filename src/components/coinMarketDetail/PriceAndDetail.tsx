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
import { Ionicons } from '@expo/vector-icons';

interface PriceAndDetailProsp {
  id: string,
  currentPrice: number,
}
const PriceAndDetail = ({ id, currentPrice }: PriceAndDetailProsp) => {

  const { datum, currency } = useAppSelector(state => ({
    datum: state.marketDetailReducer.datum,
    currency: state.baseSettingReducer.currency,
    }),
    shallowEqual
  );
  const price = useCurrencyFormat(Math.floor(datum.y) || Math.floor(currentPrice), false);

  return (
    <Container>
      <DetailView>
        <Text fontXL color300>
          { id.charAt(0).toUpperCase() + id.slice(1) }
        </Text>
        <PriceWrap>
          <Text fontXL margin="0 5px 0 0">
            {currencySymbol(currency)}
          </Text>
          <Text fontXXL>
            { price }
          </Text>
          <Text fontML margin="0 0 4px 0">
            { 
              datum.y === 0
              ? getOnlyDecimal(currentPrice, 2) && '.' + getOnlyDecimal(currentPrice, 2)
              : getOnlyDecimal(datum.y, 2) && '.' + getOnlyDecimal(datum.y, 2)
            }
          </Text>
        </PriceWrap>
        <Text fontML color400>
          {timestampToDate(datum.x)}
        </Text>
      </DetailView>
      <FavoriteBtnView>
        <FavoriteBtn>
          <Ionicons name="heart" size={24} color="white" />
        </FavoriteBtn>
      </FavoriteBtnView>
    </Container>
  )
}

export default PriceAndDetail;


const Container = styled.View`
  padding: 0 ${({theme}) => theme.content.spacing};
  flex-direction: row;
  justify-content: space-between;
  height: 100px;
`
const DetailView = styled.View`
  justify-content: space-between;
`
const FavoriteBtnView = styled.View`
  align-content: center;
  height: 100px;
`

const FavoriteBtn = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: 1px solid ${({theme}) => 'white'};
  align-items: center;
  justify-content: center;
  padding-top: 2px;
`
const PriceWrap = styled.View`
  flex-direction: row;
  align-items: flex-end;
`