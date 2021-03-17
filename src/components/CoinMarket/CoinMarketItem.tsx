import React from 'react';
import { View, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import SparkLine from './SparkLine';
import useCurrencyFormat from '/hooks/useCurrencyFormat';
import Text from '/components/common/Text';

type ItemProps = {
  item: CoinMarketReturn,
  index: number,
  onPressItem: (id:string) => void;
}

const { width } = Dimensions.get('window');

const CoinMarketItem = ({item, index, onPressItem }:ItemProps) => {
  const { price_change_percentage_24h, id, current_price,  symbol} = item;
  const price = useCurrencyFormat(current_price);
  const isRising = price_change_percentage_24h > 0;
  
  return (
    <>
    <ItemContainer onPress={() => onPressItem(item.id)}>
      <ItemColumn 
        column={1.3}
        style={{
          justifyContent: 'flex-start'
        }}
      >
        <ImageWrap>
          <ItemLogo source={{uri: item.image}} />
        </ImageWrap>
        <NameWrap>
          <Text
            fontML
            numberOfLines={1} 
            ellipsizeMode='tail'
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </Text>
          <Text color400>
            {symbol.toUpperCase()}
          </Text>
        </NameWrap>
      </ItemColumn>
      <ItemColumn column={1}>
        <SparkLine
          isRising={isRising}
          prices={item.sparkline_in_7d.price}
        />
      </ItemColumn>
      <ItemColumn column={1}>
        <View style={{width: '100%'}}>
          <Text fontML color300 right>
            {price}
          </Text>
          <FigureText isRising={isRising} right>
            {
              isRising
              ? `+${price_change_percentage_24h.toFixed(2)}%` 
              : price_change_percentage_24h.toFixed(2) +'%'
            }
          </FigureText>
        </View>
      </ItemColumn>
    </ItemContainer>
    </>
  )
}

export default React.memo(CoinMarketItem);

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
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.base.background[300]};
`
const ItemColumn = styled.View<ColumnProps>`
  flex: ${props => props.column};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`   
const NameWrap = styled.View`
  /* 전체 넓이 - spacing를 3.3등분 * 1.3 후 - 이미지 넓이 + 이미지 margin right*/
  width: ${({theme}) => (width - parseInt(theme.content.spacing) * 2) / 3.3 * 1.3 - 40}px;
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


