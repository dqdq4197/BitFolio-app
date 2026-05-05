import { Dimensions } from 'react-native'

import SkeletonPlaceholder from '@/components/skeleton-placeholder'

const PADDING = 32
const { width } = Dimensions.get('window')

const MarqueeTextSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        width={width - PADDING}
        height={40}
        borderRadius={6}
        marginTop={10}
      />
    </SkeletonPlaceholder>
  )
}

export default MarqueeTextSkeleton
