import React from 'react';
import { View, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import SparkLine from './SparkLine';

type ItemProps = {
  item: CoinMarketReturn,
  index: number,
  onPressItem: (id:string) => void;
}

const { width } = Dimensions.get('window');

const CoinMarketItem = ({item, index, onPressItem }:ItemProps) => {
  const { price_change_percentage_24h, id, current_price,  symbol} = item;

  return (
    <>
    <ItemContainer onPress={() => onPressItem(item.id)}>
      <ItemColumn column={1}>
        <ImageWrap>
          <ItemLogo source={{uri: item.image}} />
        </ImageWrap>
        <NameWrap>
          <NameText
            numberOfLines={1} 
            ellipsizeMode='tail'
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </NameText>
          <SymbolText>
            {symbol.toUpperCase()}
          </SymbolText>
        </NameWrap>
      </ItemColumn>
      <ItemColumn column={1}>
        <SparkLine
          prices={item.sparkline_in_7d.price}
        />
      </ItemColumn>
      <ItemColumn column={1}>
        <View style={{width: '100%'}}>
          <Text>
            {current_price}
          </Text>
          <FigureText isRising={price_change_percentage_24h > 0}>
            {
              price_change_percentage_24h > 0 
              ? `+${price_change_percentage_24h.toFixed(2)}` 
              : price_change_percentage_24h.toFixed(2)
            }%
          </FigureText>
        </View>
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
  width: ${({theme}) => width - parseInt(theme.content.spacing) * 2}px;
  height: 60px;
  flex-direction: row;
  margin: 0 auto 6px;
  padding-left: ${({theme}) => theme.content.spacing};
  padding-right: ${({theme}) => theme.content.spacing};
  border-radius: 3px;
`

const ItemColumn = styled.View<ColumnProps>`
  flex: ${props => props.column};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`   

const NameWrap = styled.View`
  /* 전체 넓이 - spacing를 3등분후 - 이미지 넓이 + 이미지 margin right*/
  width: ${({theme}) => (width - parseInt(theme.content.spacing) * 2) / 3 - 40}px;
`

const Text = styled.Text`
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

const ImageWrap = styled.View`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 3px;
  overflow: hidden;
`
const ItemLogo = styled.Image`
  width: 100%;
  height: 100%;
`
const FigureText = styled(Text)<FigureTextProps>`
  color: ${(props) => props.isRising ? props.theme.colors.green.a400 : props.theme.colors.red[500]};
`


