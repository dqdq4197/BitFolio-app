import React from 'react';
import GeneralTemplate from '/components/GeneralTemplate';
import CoinMarketList from '/components/coinMarket/CoinMarketList';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';

const ListScreen = ({}) => {

  return (
    <GeneralTemplate>
      <ErrorBoundaryAndSuspense skeleton={<MarketListSkeleton />}>
        <CoinMarketList />
      </ErrorBoundaryAndSuspense>
    </GeneralTemplate>
  )
}

export default ListScreen;