import Layout from '/components/coinSearch/Layout'
import AsyncBoundary from '/components/common/AsyncBoundary'

const SearchScreen = () => {
  return (
    <AsyncBoundary>
      <Layout />
    </AsyncBoundary>
  )
}

export default SearchScreen
