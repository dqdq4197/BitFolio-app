import SkeletonPlaceholder from '@/components/skeleton-placeholder'
import useGlobalTheme from '@/hooks/use-global-theme'

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
