import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

import useGlobalTheme from '/hooks/useGlobalTheme'

import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import HighlightedText from './HighlightedText'
import Image from '/components/common/Image'
import Text from '/components/common/Text'
import type { SearchCoin } from '/lib/api/coingecko/model/common'
import type { TrendingCoinItem } from '/lib/api/coingecko/model/common/TrendingCoin'

interface Props {
  index?: number
  item: SearchCoin | TrendingCoinItem
  keyword?: string
  onPress: () => void
}

const { width } = Dimensions.get('window')
const IMAGE_WIDTH = 30
const RANK_WIDTH = 45

const SearchItem = (props: Props) => {
  const { index, item, keyword, onPress } = props
  const { symbol, large, market_cap_rank, name } = item
  const { theme } = useGlobalTheme()

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Container
        underlayColor={theme.base.underlayColor[100]}
        onPress={onPress}
      >
        <>
          <Col>
            {index !== undefined && (
              <Text fontML margin="0 20px 0 0">
                {index + 1}
              </Text>
            )}
            <Image
              uri={large}
              width={IMAGE_WIDTH}
              height={IMAGE_WIDTH}
              borderRedius="m"
            />
            <NameWrap>
              <HighlightedText fontML bold value={name} keyword={keyword} />
              <HighlightedText fontM value={symbol} keyword={keyword} />
            </NameWrap>
          </Col>
          <RankWrap>
            <Text>{`#${market_cap_rank}`}</Text>
          </RankWrap>
        </>
      </Container>
    </Animated.View>
  )
}

export default SearchItem

const Container = styled.TouchableHighlight`
  width: ${width}px;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.base.background.surface};
  padding: 0 ${({ theme }) => theme.content.spacing};
`

const Col = styled.View`
  flex-direction: row;
  align-items: center;
`
const NameWrap = styled.View`
  // margin포함
  width: ${({ theme }) =>
    width -
    parseInt(theme.content.spacing, 10) * 2 -
    IMAGE_WIDTH -
    RANK_WIDTH -
    60}px;
  margin: 0 10px 0 15px;
`

const RankWrap = styled.View`
  width: ${RANK_WIDTH}px;
  align-items: flex-end;
`
