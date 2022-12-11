import React from 'react';
import SkeletonPlaceholder from '/components/skeletonPlaceholder';

import useGlobalTheme from '/hooks/useGlobalTheme';

const FiltersBarSkeleton = () => {
  const { theme } = useGlobalTheme();
  const spacing = parseInt(theme.content.spacing, 10);
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        height={45}
        alignItems="center"
        flexDirection="row"
        paddingHorizontal={spacing}
      >
        <SkeletonPlaceholder.Item
          width={100}
          height={30}
          marginRight={10}
          borderRadius={6}
        />
        <SkeletonPlaceholder.Item
          width={50}
          height={30}
          marginRight={10}
          borderRadius={6}
        />
        <SkeletonPlaceholder.Item
          width={75}
          height={30}
          marginRight={10}
          borderRadius={6}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default FiltersBarSkeleton;
