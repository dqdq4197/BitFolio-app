import TransactionsLayout from '@/components/coin-market-detail/transactions/layout'
import AsyncBoundary from '@/components/common/async-boundary'
import { TransactionsSkeleton } from '@/components/skeleton-placeholder/coin-market-detail'

const Transactions = () => {
  return (
    <AsyncBoundary skeleton={<TransactionsSkeleton />}>
      <TransactionsLayout />
    </AsyncBoundary>
  )
}

export default Transactions
