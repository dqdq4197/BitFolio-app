import React, { ReactElement } from 'react';

import useGlobalTheme from '/hooks/useGlobalTheme';

import SkeletonPlaceholder from '/components/skeletonPlaceholder';
import { CoinListSkeleton } from '/components/skeletonPlaceholder/common';

const CoinHomeSkeleton = (): ReactElement => {
  const { theme } = useGlobalTheme();
  const spacing = parseInt(theme.content.spacing, 10);
  const blankSpacing = parseInt(theme.content.blankSpacing, 10);

  return (
    <>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          paddingHorizontal={spacing}
          paddingVertical={20}
        >
          <SkeletonPlaceholder.Item height={35} width={70} borderRadius={6} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          marginTop={blankSpacing}
          paddingHorizontal={spacing}
          paddingVertical={20}
        >
          <SkeletonPlaceholder.Item height={26} width={70} borderRadius={6} />
          <SkeletonPlaceholder.Item
            height={15}
            width={90}
            marginTop={10}
            borderRadius={6}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <CoinListSkeleton itemCount={2} />
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          marginTop={blankSpacing}
          paddingHorizontal={spacing}
          paddingVertical={20}
        >
          <SkeletonPlaceholder.Item height={26} width={100} borderRadius={6} />
          <SkeletonPlaceholder.Item
            height={15}
            width={90}
            marginTop={10}
            borderRadius={6}
          />
          <SkeletonPlaceholder.Item
            marginTop={blankSpacing}
            flexDirection="row"
          >
            <SkeletonPlaceholder.Item
              height={135}
              width={135}
              borderRadius={12}
              marginRight={10}
            />
            <SkeletonPlaceholder.Item
              height={135}
              width={135}
              borderRadius={12}
              marginRight={10}
            />
            <SkeletonPlaceholder.Item
              height={135}
              width={135}
              borderRadius={12}
              marginRight={10}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </>
  );
};

export default CoinHomeSkeleton;
