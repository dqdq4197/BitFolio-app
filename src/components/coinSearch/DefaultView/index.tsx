import React from 'react'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components/native'
import RecentSearchesSection from './RecentSearchesSection'
import TrendingSearchListSection from './TrendingSearchListSection'
import QueryAsyncBoundary from '/components/common/QueryAsyncBoundary'
import SurfaceWrap from '/components/common/SurfaceWrap'
import SearchListSkeleton from '/components/skeletonPlaceholder/SearchItemListSkeleton'
import { SearchesListSkeleton } from '/components/skeletonPlaceholder/coinSearch'

interface Props {
  onPressItem: (id: string, symbol: string) => void
}

function DefaultView(props: Props) {
  const { onPressItem } = props
  const { t } = useTranslation()

  return (
    <Container>
      <SurfaceWrap
        title={t('search.recent searches')}
        marginTopZero
        parentPaddingZero
      >
        <QueryAsyncBoundary
          errorFallback={<></>}
          loadingFallback={<SearchesListSkeleton />}
        >
          <RecentSearchesSection onPressItem={onPressItem} />
        </QueryAsyncBoundary>
      </SurfaceWrap>
      <SurfaceWrap title={t('search.trending search')} parentPaddingZero>
        <QueryAsyncBoundary
          errorFallback={<></>}
          loadingFallback={<SearchListSkeleton itemCount={15} />}
        >
          <TrendingSearchListSection onPressItem={onPressItem} />
        </QueryAsyncBoundary>
      </SurfaceWrap>
    </Container>
  )
}

export default DefaultView

const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.base.background[100]};
`
