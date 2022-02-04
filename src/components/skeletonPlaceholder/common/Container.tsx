import React from 'react';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import useGlobalTheme from '/hooks/useGlobalTheme';

type ContainerProps = {
  children: JSX.Element | JSX.Element[];
}

const Container = ({ children }: ContainerProps) => {
  const { theme } = useGlobalTheme();

  return (
    <SkeletonPlaceholder
      backgroundColor={theme.base.background[200]}
      highlightColor={theme.base.background[300]}
    >
      {children}
    </SkeletonPlaceholder>
  )
}

export default Container;