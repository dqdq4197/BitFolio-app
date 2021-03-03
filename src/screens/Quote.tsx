import React, { Suspense } from 'react';
import { View, Text, StatusBar } from 'react-native';
import styled, {css} from 'styled-components/native';
import GeneralTemplate from '/components/GeneralTemplate';
import CoinMarketList from '/components/CoinMarket/CoinMarketList';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';


type QuoteProps = {}

const Quote = ({}:QuoteProps) => {

  function ErrorFallback({error, resetErrorBoundary}:FallbackProps) {
    return (
      <View>
        <Text>Something went wrong:</Text>
        <Text>{error.message}</Text>
      </View>
    )
  }

  return (
    <GeneralTemplate>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<View><Text>Loading..</Text></View>}>
          <CoinMarketList />
        </Suspense>
      </ErrorBoundary>
    </GeneralTemplate>
  )
}


export default Quote;