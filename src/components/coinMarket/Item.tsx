import React from 'react';
import { View, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import { digitToFixed } from '/lib/utils';
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat';
import useLocales from '/hooks/useLocales';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Image from '/components/common/Image';
import Text from '/components/common/Text';
import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue';
import SparkLine from './SparkLine';

type ItemProps = {
  item: CoinMarketReturn,
  onPressItem: (id:string, symbol: string) => void;
}

const { width } = Dimensions.get('window');

const Item = ({ item, onPressItem }: ItemProps) => {
  const { currency } = useLocales();
  const { theme } = useGlobalTheme();
  const { price_change_percentage_24h, id, current_price, symbol } = item;
  const isRising = (price_change_percentage_24h ?? 0) === 0
    ? null 
    : price_change_percentage_24h! > 0 
  
  return (
    <>
    <ItemContainer 
      onPress={() => onPressItem(item.id, item.symbol)}
      underlayColor={theme.base.underlayColor[100]}
    >
      <>
        <ItemColumn 
          column={ 1.3 }
          style={{
            justifyContent: 'flex-start'
          }}
        >
          <ImageWrap>
            <Image 
              uri={ item.image } 
              width={ 30 }
              height={ 30 }
            />
          </ImageWrap>
          <NameWrap>
            <Text
              fontML
              bold
              color100
              numberOfLines={ 1 } 
              ellipsizeMode='tail'
            >
              { id.charAt(0).toUpperCase() + id.slice(1) }
            </Text>
            <Text>
              { symbol.toUpperCase() }
            </Text>
          </NameWrap>
        </ItemColumn>
        <ItemColumn column={ 1 }>
          <SparkLine
            isRising={ isRising }
            prices={ item.sparkline_in_7d.price }
          />
        </ItemColumn>
        <ItemColumn column={ 1 }>
          <View style={{ width: '100%' }}>
            <Text fontML color100 right>
              { currencyFormat({
                value: current_price,
                prefix: getCurrencySymbol(currency),
              }) }
            </Text>
            <IncreaseDecreaseValue
              value={ digitToFixed(price_change_percentage_24h ?? 0, 2) }
              afterPrefix={'%'}
              right
            />
          </View>
        </ItemColumn>
      </>
    </ItemContainer>
    </>
  )
}

export default React.memo(Item);

type ColumnProps = {
  column: number,
}

const ItemContainer = styled.TouchableHighlight`
  height: 65px;
  flex-direction: row;
  padding: 0 ${({ theme }) => theme.content.spacing};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.base.background[300]};
`
const ItemColumn = styled.View<ColumnProps>`
  flex: ${props => props.column};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`   
const NameWrap = styled.View`
  /* 전체 넓이 - spacing를 3.3등분 * 1.3 후 - 이미지 넓이 + 이미지 margin right*/
  width: ${({ theme }) => (width - parseInt(theme.content.spacing) * 2) / 3.3 * 1.3 - 40}px;
`
const ImageWrap = styled.View`
  margin-right: 10px;
  border-radius: ${({ theme }) => theme.border.s};
  overflow: hidden;
`