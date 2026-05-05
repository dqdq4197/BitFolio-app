import useRequest from '../use-request'
import { Cryptocompare, http } from '@/lib/api/cryptocompare-client'
import type { FeedReturn } from '@/types/crypto-compare-return-type'

type FeedProps = {
  suspense?: boolean
  refreshInterval?: number
}

const useNewsFeed = ({ suspense, refreshInterval }: FeedProps) => {
  const getKey = Cryptocompare.news.feeds({})

  return useRequest<FeedReturn[]>(getKey, http, { suspense, refreshInterval })
}

export default useNewsFeed
