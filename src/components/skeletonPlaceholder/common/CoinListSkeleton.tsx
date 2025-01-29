import React, { ReactElement } from 'react'
import { Dimensions } from 'react-native'

import useGlobalTheme from '/hooks/useGlobalTheme'

import SkeletonPlaceholder from '/components/skeletonPlaceholder'

const { width } = Dimensions.get('window')

interface CoinListSkeletonProps {
  itemCount?: number
}

const CoinListSkeleton = ({
  itemCount = 5,
}: CoinListSkeletonProps): ReactElement => {
  return (
    <SkeletonPlaceholder>
      {Array.from({ length: itemCount }, (_, index) => (
        <CoinListSkeleton.Item key={index} />
      ))}
    </SkeletonPlaceholder>
  )
}

CoinListSkeleton.Item = function CoinItemSkeleton() {
  const { theme } = useGlobalTheme()
  const spacing = parseInt(theme.content.spacing, 10)

  return (
    <>
      <SkeletonPlaceholder.Item
        paddingHorizontal={spacing}
        flexDirection="row"
        justifyContent="space-between"
        height={60}
        width={width}
        alignItems="center"
      >
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item
            width={15}
            height={20}
            marginRight={20}
            borderRadius={6}
          />
          <SkeletonPlaceholder.Item
            width={30}
            height={30}
            borderRadius={25}
            marginRight={10}
          />
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={70}
              height={13}
              marginBottom={10}
            />
            <SkeletonPlaceholder.Item width={40} height={10} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={60} height={20} marginRight={20} />
          <SkeletonPlaceholder.Item
            width={40}
            height={40}
            borderRadius={20}
            justifyContent="flex-end"
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item width={width} height={1} />
    </>
  )
}

export default CoinListSkeleton
