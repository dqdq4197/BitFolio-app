import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';

type ItemProps = {
  item: CoinMarketReturn,
  index: number,
}
const CoinMarketItem = ({item, index}:ItemProps) => {

  return (
    <ItemContainer>
      <ItemColumn column={1}>
        <ItemSymborWrap>
          <ItemLogo source={{uri: item.image}} />
          <Text>
            {item.id}
          </Text>
        </ItemSymborWrap>
      </ItemColumn>
      <ItemColumn column={1}>
        <Text>
          {item.price_change_percentage_24h.toFixed(2)}%
        </Text>
      </ItemColumn>
      <ItemColumn column={1}>
        <Text>
          {item.current_price}
        </Text>
      </ItemColumn>
    </ItemContainer>
  )
}

export default CoinMarketItem;

type ColumnProps = {
  column: number,
}

const ItemContainer = styled.View`
  flex-direction: row;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
`

const ItemSymborWrap = styled.View`
  flex-direction: row;
  
`

const ItemLogo = styled.Image`
  border-radius: 3px;
  width: 30px;
  height: 30px;
`

const ItemColumn = styled.View<ColumnProps>`
  flex: ${({column}) => column};
`

const Text = styled.Text`
  color: white;
  text-align: right;
`

