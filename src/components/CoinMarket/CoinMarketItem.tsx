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

  const { price_change_percentage_24h, id, current_price } = item;

  return (
    <ItemContainer>
      <ItemColumn column={1}>
        <ItemSymborWrap>
          <ItemLogo source={{uri: item.image}} />
          <Text numberOfLines={1} ellipsizeMode='tail'>
            {id}
          </Text>
        </ItemSymborWrap>
      </ItemColumn>
      <ItemColumn column={1}>
        <FigureText isRising={price_change_percentage_24h > 0}>
          {
            price_change_percentage_24h > 0 
            ? `+${price_change_percentage_24h.toFixed(2)}` 
            : price_change_percentage_24h.toFixed(2)
          }%
        </FigureText>
      </ItemColumn>
      <ItemColumn column={1}>
        <Text>
          {current_price}
        </Text>
      </ItemColumn>
    </ItemContainer>
  )
}

export default CoinMarketItem;

type ColumnProps = {
  column: number,
}

type FigureTextProps = {
  isRising: boolean,
}

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({theme}) => theme.content.padding};
  padding-right: ${({theme}) => theme.content.padding};
`

const ItemSymborWrap = styled.View`
  flex-direction: row;
`

const ItemLogo = styled.Image`
  border-radius: 3px;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`

const ItemColumn = styled.View<ColumnProps>`
  flex: ${({column}) => column};
  justify-content: center;
`

const Text = styled.Text`
  height: 100%;
  color: white;
  text-align: right;
  font-size: ${({theme}) => theme.size.font_ml};
`

const FigureText = styled(Text)<FigureTextProps>`
  color: ${(props) => props.isRising ? props.theme.colors.green.a400 : props.theme.colors.red[500]};
`


