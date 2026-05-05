import NewsLayout from '@/components/coin-market-detail/news/layout'
import AsyncBoundary from '@/components/common/async-boundary'
import { NewsArticleListSkeleton } from '@/components/skeleton-placeholder/news'

const News = () => {
  return (
    <AsyncBoundary skeleton={<NewsArticleListSkeleton />}>
      <NewsLayout />
    </AsyncBoundary>
  )
}

export default News
