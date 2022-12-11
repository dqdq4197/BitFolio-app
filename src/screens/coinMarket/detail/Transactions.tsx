import React from 'react';

import TransactionsLayout from '/components/coinMarketDetail/transactions/Layout';
import AsyncBoundary from '/components/common/AsyncBoundary';
import { TransactionsSkeleton } from '/components/skeletonPlaceholder/coinMarketDetail';

const Transactions = () => {
  return (
    <AsyncBoundary skeleton={<TransactionsSkeleton />}>
      <TransactionsLayout />
    </AsyncBoundary>
  );
};

export default Transactions;
