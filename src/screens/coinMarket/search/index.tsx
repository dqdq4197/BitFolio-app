import React, { Suspense } from 'react';
import { View, Text } from 'react-native';
import GeneralTemplate from '/components/GeneralTemplate';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';


const SearchStack = ({}) => {

  function ErrorFallback({error, resetErrorBoundary}:FallbackProps) {
    return (
      <View>
        <Text style={{color:'white'}}>Something went wrong:</Text>
        <Text style={{color:'white'}}>{error.message}</Text>
      </View>
    )
  }

  return (
    <GeneralTemplate>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense 
          fallback={<MarketListSkeleton/>}
        >
        </Suspense>
      </ErrorBoundary>
    </GeneralTemplate>
  )
}

export default SearchStack;