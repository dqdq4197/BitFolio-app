import React, { Suspense } from 'react';
import { Text, View } from 'react-native';
import GeneralTemplate from '/components/GeneralTemplate';
import ItemDetail from '/components/coinMarketDetail/ItemDetail';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';



const CoinMarketDetailScreen = () => {


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
          fallback={<SuspenseFallback/>}
        >
          <ItemDetail />
        </Suspense>
      </ErrorBoundary>
    </GeneralTemplate>
  )
}

export default CoinMarketDetailScreen;