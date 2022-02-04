import React from 'react';

import TransactionsLayout from '/components/coinMarketDetail/transactions/Layout';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';
import TransactionsSkeleton from '/components/skeletonPlaceholder/coinMarketDetail/TransactionsSkeleton';

const Transactions = () => {
  return (
    <ErrorBoundaryAndSuspense skeleton={<TransactionsSkeleton />}>
      <TransactionsLayout />
    </ErrorBoundaryAndSuspense>
  );
};

export default Transactions;
