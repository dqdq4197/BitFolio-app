import React from 'react'
import styled from 'styled-components/native'
import Image from '/components/common/Image'
import Text from '/components/common/Text'
import type { CoinMarket } from '/lib/api/coingecko/model/common'

interface Props {
  coinMarket: CoinMarket
  onPressItem: (id: string, symbol: string) => void
}

function SearchesItem(props: Props) {
  const { coinMarket, onPressItem } = props
  const { name, id, symbol, image } = coinMarket

  return (
    <SearchesItemContainer
      activeOpacity={0.8}
      onPress={() => onPressItem(id, symbol)}
    >
      <Image uri={image} width={30} height={30} borderRedius="m" />
      <Text
        fontML
        bold
        color100
        numberOfLines={1}
        ellipsizeMode="tail"
        margin="8px 0 0 0"
      >
        {name}
      </Text>
      <Text
        fontM
        bold
        numberOfLines={1}
        ellipsizeMode="tail"
        margin="2px 0 0 0"
      >
        {symbol}
      </Text>
    </SearchesItemContainer>
  )
}

export default SearchesItem

const SearchesItemContainer = styled.TouchableOpacity`
  width: 120px;
  height: 110px;
  margin-right: 10px;
  background-color: ${({ theme }) => theme.base.background[300]};
  border-radius: ${({ theme }) => theme.border.ml};
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`
