import React from 'react';
import { View, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';

type ItemProps = {
  item: CoinMarketReturn,
  index: number,
  onPressItem: (id:string) => void;
}
const CoinMarketItem = ({item, index, onPressItem }:ItemProps) => {
  const { price_change_percentage_24h, id, current_price,  symbol} = item;

  return (
    <>
    <ItemContainer onPress={() => onPressItem(item.id)}>
      <ItemColumn column={1}>
        <ItemLogo source={{uri: item.image}} />
        <View>
          <NameText
            numberOfLines={1} 
            ellipsizeMode='tail'
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </NameText>
          <SymbolText>
            {symbol.toUpperCase()}
          </SymbolText>
        </View>
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
    </>
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
  width: ${Dimensions.get('window').width}px;
  height: 60px;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({theme}) => theme.content.padding};
  padding-right: ${({theme}) => theme.content.padding};
`

const ItemColumn = styled.View<ColumnProps>`
  flex: 1;
  flex-direction: row;
  height: 100%;
  align-items: center;
`   

const Text = styled.Text`
  width: 100%;
  color:  ${({theme}) => theme.base.text[300]};
  text-align: right;
  font-size: ${({theme}) => theme.size.font_ml};
`


const NameText = styled(Text)`
  text-align: left;
`

const SymbolText = styled(NameText)`
  font-size: ${({theme}) => theme.size.font_m};
  color: ${({theme}) => theme.base.text[400]};
`

const ItemLogo = styled.Image`
  border-radius: 3px;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`
const FigureText = styled(Text)<FigureTextProps>`
  color: ${(props) => props.isRising ? props.theme.colors.green.a400 : props.theme.colors.red[500]};
`


