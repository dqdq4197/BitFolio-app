import React, { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import styled from 'styled-components/native';
import Text from '/components/common/Text';

interface SkeletonType {
  skeleton?: React.ReactNode;
}
interface BoundaryProps extends SkeletonType {
  children: React.ReactNode;
}

const ErrorFallback = ({ error }: FallbackProps) => {
  return (
    <View>
      <Text>Something went wrong:</Text>
      <Text>{error.message}</Text>
    </View>
  );
};

const SuspenseFallback = ({ skeleton }: SkeletonType) => {
  return <View>{skeleton}</View>;
};

const AsyncBoundary = ({ skeleton, children }: BoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<SuspenseFallback skeleton={skeleton} />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;

const View = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.base.background.surface};
`;
