import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import Text from '/components/common/Text'

function SearchesEmptyView() {
  const { t } = useTranslation()

  return (
    <SearchesEmptyContainer>
      <Text fontML bold>
        {t(`search.there are no recent searches`)}
      </Text>
    </SearchesEmptyContainer>
  )
}

export default SearchesEmptyView

const SearchesEmptyContainer = styled.View`
  height: 50px;
  align-items: center;
  justify-content: center;
`
