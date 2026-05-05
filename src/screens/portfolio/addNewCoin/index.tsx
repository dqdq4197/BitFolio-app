import AsyncBoundary from '@/components/common/AsyncBoundary'
import Layout from '@/components/portfolio/addNewCoin'

const AddNewCoinScreen = () => {
  return (
    <AsyncBoundary>
      <Layout />
    </AsyncBoundary>
  )
}

export default AddNewCoinScreen
