import useRequest from './useRequest';
import { Cryptocompare, http } from '/lib/api/CryptocompareClient';
import { FeedAndCategoryReturn } from '/lib/api/CryptoCompareReturnType';

type FeedProps = {
  suspense?: boolean,
  refreshInterval?: number,
}
const useNewsFeedsAndCategories = ({ suspense, refreshInterval }: FeedProps) => {
  const getKey = Cryptocompare.news.feedAndCategories({})

  return useRequest<FeedAndCategoryReturn>(getKey, http, { suspense, refreshInterval })
}

export default useNewsFeedsAndCategories;