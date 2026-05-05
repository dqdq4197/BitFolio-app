import { useTranslation } from 'react-i18next'

import styled from 'styled-components/native'
import RecentSearchesSection from './recent-searches-section'
import TrendingSearchListSection from './trending-search-list-section'
import QueryAsyncBoundary from '@/components/common/query-async-boundary'
import SurfaceWrap from '@/components/common/surface-wrap'
import SearchListSkeleton from '@/components/skeleton-placeholder/search-item-list-skeleton'
import { SearchesListSkeleton } from '@/components/skeleton-placeholder/coin-search'

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
