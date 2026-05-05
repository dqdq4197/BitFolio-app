import ProfileLayout from '@/components/coin-market-detail/profile/layout'
import AsyncBoundary from '@/components/common/async-boundary'

const Profile = () => {
  return (
    <AsyncBoundary>
      <ProfileLayout />
    </AsyncBoundary>
  )
}

export default Profile
