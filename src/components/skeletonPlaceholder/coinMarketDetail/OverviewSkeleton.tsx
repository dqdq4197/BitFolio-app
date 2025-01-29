import React from 'react'
import { Dimensions } from 'react-native'

import useGlobalTheme from '/hooks/useGlobalTheme'

import SkeletonPlaceholder from '/components/skeletonPlaceholder'

const { width } = Dimensions.get('window')

const OverviewSkeleton = () => {
  const { theme } = useGlobalTheme()
  const spacing = parseInt(theme.content.spacing, 10)

  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        paddingHorizontal={spacing}
        paddingVertical={15}
      >
        <SkeletonPlaceholder.Item height={38.5} width={200} borderRadius={6} />
        <SkeletonPlaceholder.Item
          height={19}
          width={149}
          marginTop={5}
          borderRadius={6}
        />
        <SkeletonPlaceholder.Item
          marginTop={30}
          height={280}
          width={width - spacing * 2}
          borderRadius={6}
        />
        <SkeletonPlaceholder.Item
          marginTop={20}
          width={width - spacing * 2}
          borderRadius={6}
          justifyContent="space-between"
          flexDirection="row"
        >
          <OverviewSkeleton.Tab />
          <OverviewSkeleton.Tab />
          <OverviewSkeleton.Tab />
          <OverviewSkeleton.Tab />
          <OverviewSkeleton.Tab />
          <OverviewSkeleton.Tab />
          <OverviewSkeleton.Tab />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          marginTop={35}
          height={22}
          width={80}
          borderRadius={6}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

OverviewSkeleton.Tab = function OverviewChartTab() {
  return <SkeletonPlaceholder.Item height={30} width={36.5} borderRadius={6} />
}

export default OverviewSkeleton
