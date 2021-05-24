import React from 'react';
import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';
import { baseTypes } from 'base-types';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import { digitToFixed } from '/lib/utils';
import useLocales from '/hooks/useLocales';
import Image from '/components/common/Image';
import Text from '/components/common/Text';
import { convertUnits } from '/lib/utils';
import WatchListIcon from '/components/common/WatchListIcon';
import useCurrencyFormat from '/hooks/useCurrencyFormat';

const { width } = Dimensions.get('window');

type ItemProps = {
  item: CoinMarketReturn;
  index: number;
  valueKey: 'total_volume' | 'market_cap' | 'current_price';
  percentageKey?: 'market_cap_change_percentage_24h' | 'price_change_percentage_24h';
  onPressItem: (id:string, symbol: string) => void;
  NoneUnderLine?: boolean;
}

interface ValueProps {
  value: number,
  currency: baseTypes.Currency,
}

interface PercentageProps extends ValueProps {
  percentage: number, 
}

const OnlyValue = ({ value, currency }: ValueProps) => (
  <ValueWrap>
    <Text fontML color100 right>
      { convertUnits(value, currency) }
    </Text>
  </ValueWrap>
)

const ValueWithPercentage = ({ value, percentage, currency }: PercentageProps) => (
  <ValueWrap>
    <Text fontML color100 right>
      { convertUnits(value, currency) }
    </Text>
    <FigureText percentage={ percentage } right>
      {
        percentage > 0
        ? `+${ digitToFixed(percentage, 2) }%` 
        : digitToFixed(percentage, 2) +'%'
      }
    </FigureText>
  </ValueWrap>
)

const Item = ({ 
  item,
  index,
  valueKey, 
  percentageKey,
  NoneUnderLine=false, 
  onPressItem
 }: ItemProps) => {
  const { currency } = useLocales();
  const { id, symbol } = item;
  
  return (
    <>
    <ItemContainer 
      onPress={() => onPressItem(item.id, item.symbol)} 
      NoneUnderLine={NoneUnderLine} 
    >
      <ItemColumn 
        column={ 0.35 }
        style={{
          justifyContent: 'flex-start'
        }}
      >
        <Text fontM color100 bold>
          { index + 1 }
        </Text>
      </ItemColumn>
      <ItemColumn 
        column={ 1.4 }
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
      <ItemColumn column={ 1.2 }>
        { percentageKey 
          ? <ValueWithPercentage 
              value={item[valueKey]}
              currency={currency}
              percentage={item[percentageKey]}
            />
          : <OnlyValue 
              value={item[valueKey]}
              currency={currency}
            />
        }
      </ItemColumn>
      <ItemColumn column={ 0.5 } style={{ justifyContent: 'flex-end'}}>
        <WatchListIcon id={item.id} size={28} />
      </ItemColumn>
    </ItemContainer>
    </>
  )
}

export default React.memo(Item);

type ContainerProps = {
  NoneUnderLine: boolean,
}
type ColumnProps = {
  column: number,
}

type FigureTextProps = {
  percentage: number,
}

const ItemContainer = styled.TouchableOpacity<ContainerProps>`
  width: ${({ theme }) => width - parseInt(theme.content.spacing) * 2}px;
  height: 60px;
  flex-direction: row;
  margin: 0 auto 6px;
  ${(props) => !props.NoneUnderLine && css`
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.base.background[300]};
  `} 
  
`
const ItemColumn = styled.View<ColumnProps>`
  flex: ${props => props.column};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`   
const NameWrap = styled.View`
  /* 전체 넓이 - spacing를 2.5등분 * 1.3 후 - 이미지 넓이 + 이미지 margin right*/
  width: ${({ theme }) => (width - parseInt(theme.content.spacing) * 2) / 2.5 * 1.3 - 40}px;
`
const ImageWrap = styled.View`
  margin-right: 10px;
  border-radius: ${({ theme }) => theme.border.s};
  overflow: hidden;
`
const FigureText = styled(Text)<FigureTextProps>`
  color: ${(props) => props.percentage > 0 
    ? props.theme.colors.green.a400 
    : props.percentage === 0 
      ? props.theme.base.text[200]
      : props.theme.colors.red[500]
  };
`
const ValueWrap = styled.View`
  width: 100%;
`

