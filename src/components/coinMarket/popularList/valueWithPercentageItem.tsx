import React from 'react'
import { View, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'

import useCurrencyFormat from '/hooks/useCurrencyFormat'
import useGlobalTheme from '/hooks/useGlobalTheme'
import { digitToFixed } from '/lib/utils'
import type { CoinMarketReturn } from '/types/coinGeckoReturnType'

import Image from '/components/common/Image'
import Text from '/components/common/Text'
import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue'

type ItemProps = {
  item: CoinMarketReturn
  index: number
  onPressItem: (id: string) => void
}

const { width } = Dimensions.get('window')

const ValueWithPercentageItem = ({ item, index, onPressItem }: ItemProps) => {
  const { theme } = useGlobalTheme()
  const { price_change_percentage_24h, id, current_price, symbol } = item
  const price = useCurrencyFormat(current_price)

  return (
    <ItemContainer onPress={() => onPressItem(item.id)}>
      <ItemColumn column={0.2} justifyContent="flex-start">
        <Text fontML color100 bold>
          {index + 1}
        </Text>
      </ItemColumn>
      <ItemColumn column={1.3} justifyContent="flex-start">
        <ImageWrap>
          <Image uri={item.image} width={30} height={30} />
        </ImageWrap>
        <NameWrap>
          <Text fontML bold color100 numberOfLines={1} ellipsizeMode="tail">
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </Text>
          <Text>{symbol.toUpperCase()}</Text>
        </NameWrap>
      </ItemColumn>
      <ItemColumn column={1.2}>
        <View>
          <Text fontML color100 right>
            {price}
          </Text>
          <IncreaseDecreaseValue
            value={digitToFixed(price_change_percentage_24h ?? 0, 2)}
            afterPrefix="%"
            right
          />
        </View>
      </ItemColumn>
      <ItemColumn column={0.5} justifyContent="flex-end">
        <Ionicons name="heart-sharp" size={28} color={theme.base.text[200]} />
      </ItemColumn>
    </ItemContainer>
  )
}

export default React.memo(ValueWithPercentageItem)

type ColumnProps = {
  column: number
  justifyContent?: 'flex-end' | 'flex-start' | 'center'
}

const ItemContainer = styled.TouchableOpacity`
  width: ${({ theme }) => width - parseInt(theme.content.spacing, 10) * 2}px;
  height: 60px;
  flex-direction: row;
  margin: 0 auto 6px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.base.background[300]};
`

const ItemColumn = styled.View<ColumnProps>`
  flex: ${props => props.column};
  flex-direction: row;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
`

const NameWrap = styled.View`
  /* 전체 넓이 - spacing를 3.3등분 * 1.3 후 - 이미지 넓이 + 이미지 margin right*/
  width: ${({ theme }) =>
    ((width - parseInt(theme.content.spacing, 10) * 2) / 3.3) * 1.3 - 40}px;
`

const ImageWrap = styled.View`
  margin-right: 10px;
  border-radius: ${({ theme }) => theme.border.s};
  overflow: hidden;
`
