import React, { Suspense } from 'react';
import { View, Text } from 'react-native';
import GeneralTemplate from '/components/GeneralTemplate';
import CoinMarketList from '/components/coinMarket/CoinMarketList';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';


const CoinMarketListScreen = ({}) => {

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
          <CoinMarketList />
        </Suspense>
      </ErrorBoundary>
    </GeneralTemplate>
  )
}

export default CoinMarketListScreen;