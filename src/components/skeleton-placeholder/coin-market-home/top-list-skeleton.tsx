import { Dimensions } from 'react-native'

import useGlobalTheme from '@/hooks/use-global-theme'

import SkeletonPlaceholder from '@/components/skeleton-placeholder'
import { CoinListSkeleton } from '@/components/skeleton-placeholder/common'

const { width } = Dimensions.get('window')

const TopListSkeleton = () => {
  const { theme } = useGlobalTheme()
  const spacing = parseInt(theme.content.spacing, 10)

  return (
    <>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          paddingHorizontal={spacing}
          paddingVertical={20}
        >
          <SkeletonPlaceholder.Item height={30} width={130} borderRadius={6} />
          <SkeletonPlaceholder.Item
            height={18}
            width={width - spacing * 2}
            marginTop={10}
            borderRadius={6}
          />
          <SkeletonPlaceholder.Item
            height={18}
            width={width - spacing * 2}
            marginTop={5}
            borderRadius={6}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <CoinListSkeleton itemCount={11} />
    </>
  )
}

export default TopListSkeleton
