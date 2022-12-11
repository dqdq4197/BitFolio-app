import React from 'react';
import { Dimensions } from 'react-native';

import useGlobalTheme from '/hooks/useGlobalTheme';

import SkeletonPlaceholder from '/components/skeletonPlaceholder';

const { width } = Dimensions.get('window');

interface NewsArticleListSkeletonProps {
  itemCount?: number;
}

const NewsArticleListSkeleton = ({
  itemCount = 3,
}: NewsArticleListSkeletonProps) => {
  return (
    <SkeletonPlaceholder>
      {Array.from({ length: itemCount }, (_, index) => (
        <NewsArticleListSkeleton.Article key={index} />
      ))}
    </SkeletonPlaceholder>
  );
};

NewsArticleListSkeleton.Article = function ArticleSkeleton() {
  const { theme } = useGlobalTheme();
  const spacing = parseInt(theme.content.spacing, 10);

  return (
    <SkeletonPlaceholder.Item paddingHorizontal={spacing} paddingVertical={15}>
      <SkeletonPlaceholder.Item height={13} width={140} borderRadius={6} />
      <SkeletonPlaceholder.Item
        flexDirection="row"
        marginTop={10}
        justifyContent="space-between"
      >
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            height={25}
            width={width - spacing - 100}
            borderRadius={6}
          />
          <SkeletonPlaceholder.Item
            marginTop={10}
            height={25}
            width={width - spacing - 100}
            borderRadius={6}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item height={60} width={60} borderRadius={6} />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item flexDirection="row" marginTop={15}>
        <SkeletonPlaceholder.Item height={15} width={30} borderRadius={6} />
        <SkeletonPlaceholder.Item
          marginLeft={10}
          height={15}
          width={30}
          borderRadius={6}
        />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        marginTop={20}
        height={68}
        width="100%"
        borderRadius={6}
      />
    </SkeletonPlaceholder.Item>
  );
};

export default NewsArticleListSkeleton;
