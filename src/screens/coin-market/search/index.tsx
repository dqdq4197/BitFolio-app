import Layout from '@/components/coin-search/layout'
import AsyncBoundary from '@/components/common/async-boundary'

const SearchScreen = () => {
  return (
    <AsyncBoundary>
      <Layout />
    </AsyncBoundary>
  )
}

export default SearchScreen
