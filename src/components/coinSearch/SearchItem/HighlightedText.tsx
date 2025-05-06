import React, { useMemo } from 'react'
import styled from 'styled-components/native'
import Text, { type TextStyleProps } from '/components/common/Text'
import { createFuzzyMatcher } from '/lib/utils'
import { splitKeywordByMatcher } from '/lib/utils/splitKeywordByMatcher'

interface Props extends TextStyleProps {
  value: string
  keyword?: string
}

function HighlightedText(props: Props) {
  const { value, keyword = '', ...textProps } = props

  const splitNameByMatcher = useMemo(() => {
    const keywordRegExp = createFuzzyMatcher(keyword)

    return splitKeywordByMatcher(keywordRegExp, value)
  }, [value, keyword])

  return (
    <Container>
      {splitNameByMatcher.map(({ value, isMatch, index }) => (
        <Text
          key={value + index}
          color100={!isMatch}
          primaryColor={isMatch}
          numberOfLines={1}
          ellipsizeMode="tail"
          {...textProps}
        >
          {value}
        </Text>
      ))}
    </Container>
  )
}

export default HighlightedText

const Container = styled.View`
  flex-direction: row;
`
