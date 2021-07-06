import React from 'react';
import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';
import { baseTypes } from 'base-types';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import { digitToFixed } from '/lib/utils';
import useLocales from '/hooks/useLocales';
import Image from '/components/common/Image';
import Text from '/components/common/Text';
import WatchListIcon from '/components/common/WatchListIcon';
import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue';
import { convertUnits } from '/lib/utils';
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat';

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
  percentage: number | null, 
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
      { value >= 1000000 
        ? convertUnits(value, currency) 
        : currencyFormat({ value, prefix: getCurrencySymbol(currency) })
      }
    </Text>
    <IncreaseDecreaseValue
      value={ digitToFixed(percentage ?? 0, 2) }
      afterPrefix={'%'}
      textStyle={{
        right: true
      }}
    />
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
      activeOpacity={0.6}
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

/* height값 바꿀 시 주의
   flexList getItemLayout 수치 똑같이 바꿔주기.
*/
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
  /* 전체 넓이 - spacing를 2.5등분 * 1.2 후 - 이미지 넓이 + 이미지 margin right*/
  width: ${({ theme }) => (width - parseInt(theme.content.spacing) * 2) / 2.5 * 1.2 - 40}px;
`
const ImageWrap = styled.View`
  margin-right: 10px;
  border-radius: ${({ theme }) => theme.border.s};
  overflow: hidden;
`

const ValueWrap = styled.View`
  width: 100%;
`

