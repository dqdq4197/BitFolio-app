import React from 'react'
import SkeletonPlaceholder from '/components/skeletonPlaceholder'
import useGlobalTheme from '/hooks/useGlobalTheme'

function SearchesListSkeleton() {
  const { theme } = useGlobalTheme()

  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        gap={10}
        paddingHorizontal={parseInt(theme.content.spacing, 10)}
      >
        {Array.from({ length: 3 }, (_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            width={120}
            height={110}
            borderRadius={12}
          />
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

export default SearchesListSkeleton
