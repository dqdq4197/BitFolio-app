import AsyncBoundary from '@/components/common/async-boundary'
import DiscussionHome from '@/components/discussion-home'

const HomeScreen = () => {
  return (
    <AsyncBoundary skeleton={<></>}>
      <DiscussionHome />
    </AsyncBoundary>
  )
}

export default HomeScreen
