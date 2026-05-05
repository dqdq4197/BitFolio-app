import AsyncBoundary from '@/components/common/AsyncBoundary'
import DiscussionHome from '@/components/discussionHome'

const HomeScreen = () => {
  return (
    <AsyncBoundary skeleton={<></>}>
      <DiscussionHome />
    </AsyncBoundary>
  )
}

export default HomeScreen
