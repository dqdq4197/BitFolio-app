import useRequest from './useRequest';
import { Cryptocompare, http } from '/lib/api/CryptocompareClient';
import { FeedReturn } from '/lib/api/CryptoCompareReturnType';

type FeedProps = {
  suspense?: boolean,
  refreshInterval?: number,
}
const useNewsFeed = ({ suspense, refreshInterval }: FeedProps) => {
  const getKey = Cryptocompare.news.feeds({})

  return useRequest<FeedReturn[]>(getKey, http, { suspense, refreshInterval })
}

export default useNewsFeed;