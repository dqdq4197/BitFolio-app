import React, { Suspense } from 'react';
import { View, Text } from 'react-native';
import GeneralTemplate from '/components/GeneralTemplate';
import CoinMarketList from '/components/CoinMarket/CoinMarketList';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';


const CoinMarketListScreen = ({}) => {


  function ErrorFallback({error, resetErrorBoundary}:FallbackProps) {
    
    return (
      <View>
        <Text>Something went wrong:</Text>
        <Text>{error.message}</Text>
      </View>
    )
  }

  function SuspenseFallback() {
    return (
      <View>
        <Text style={{color:'white', flex: 1, alignItems:'center', justifyContent: 'center'}}>Loading..</Text>
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