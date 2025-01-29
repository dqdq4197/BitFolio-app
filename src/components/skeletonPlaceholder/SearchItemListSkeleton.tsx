import React from 'react'
import { Dimensions } from 'react-native'

import useGlobalTheme from '/hooks/useGlobalTheme'

import SkeletonPlaceholder from '.'

const { width } = Dimensions.get('window')

interface SearchListSkeletonProps {
  itemCount?: number
}

const SearchListSkeleton = ({ itemCount = 13 }: SearchListSkeletonProps) => {
  return (
    <SkeletonPlaceholder>
      {Array.from({ length: itemCount }, (_, index) => (
        <SearchListSkeleton.Item key={index} />
      ))}
    </SkeletonPlaceholder>
  )
}

SearchListSkeleton.Item = function SearchItemSkeleton() {
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
            width={30}
            height={30}
            borderRadius={25}
            marginRight={10}
          />
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={100}
              height={13}
              borderRadius={6}
              marginBottom={10}
            />
            <SkeletonPlaceholder.Item width={60} height={10} borderRadius={6} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={40} height={13} borderRadius={9} />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item width={width} height={1} />
    </>
  )
}

export default SearchListSkeleton
