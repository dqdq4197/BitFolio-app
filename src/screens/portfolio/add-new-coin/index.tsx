import AsyncBoundary from '@/components/common/async-boundary'
import Layout from '@/components/portfolio/add-new-coin'

const AddNewCoinScreen = () => {
  return (
    <AsyncBoundary>
      <Layout />
    </AsyncBoundary>
  )
}

export default AddNewCoinScreen
