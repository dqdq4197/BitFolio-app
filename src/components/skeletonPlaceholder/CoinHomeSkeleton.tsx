import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import useGlobalTheme from '/hooks/useGlobalTheme';

import { Container, CoinItem } from './common';

const HighVolumeSkeleton = () => {
  const {
    theme: {
      content: { spacing, blankSpacing },
    },
  } = useGlobalTheme();
  return (
    <>
      <Container>
        <SkeletonPlaceholder.Item
          paddingHorizontal={parseInt(spacing, 10)}
          paddingVertical={20}
        >
          <SkeletonPlaceholder.Item height={35} width={70} borderRadius={6} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          marginTop={parseInt(blankSpacing, 10)}
          paddingHorizontal={parseInt(spacing, 10)}
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
      </Container>
      <CoinItem />
      <CoinItem />
      <Container>
        <SkeletonPlaceholder.Item
          marginTop={parseInt(blankSpacing, 10)}
          paddingHorizontal={parseInt(spacing, 10)}
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
            marginTop={parseInt(blankSpacing, 10)}
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
      </Container>
    </>
  );
};

export default HighVolumeSkeleton;
