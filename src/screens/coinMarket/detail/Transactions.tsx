import React from 'react';
import TransactionsLayout from '/components/coinMarketDetail/transactions/Layout';
import MarketListSkeleton from '/components/skeletonPlaceholder/MarketListSkeleton';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';


const Transactions = () => {
  return (
    <ErrorBoundaryAndSuspense skeleton={<MarketListSkeleton/>} >
      <TransactionsLayout/>
    </ErrorBoundaryAndSuspense>

  )
}

export default Transactions;