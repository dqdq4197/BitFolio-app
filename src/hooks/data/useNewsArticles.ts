import { AxiosResponse } from 'axios';

import {
  ArticleParams,
  Cryptocompare,
  http,
} from '/lib/api/CryptocompareClient';
import type { NewsReturn } from '/types/cryptoCompareReturnType';

import useRequestInfinite from '../useRequestInfinite';

interface ParamsType
  extends Pick<ArticleParams, 'feeds' | 'lTs' | 'sortOrder' | 'categories'> {
  suspense?: boolean;
  refreshInterval?: number;
  willNotRequest?: boolean;
}

export default ({
  suspense = true,
  refreshInterval,
  willNotRequest = false,
  ...params
}: ParamsType) => {
  const getKey = (
    pageIndex: number,
    previousPageData: AxiosResponse<unknown> | null
  ) => {
    if (previousPageData && !(previousPageData as any).length) return null;
    if (willNotRequest) return null;
    return Cryptocompare.news.articles({
      ...params,
    });
  };

  return useRequestInfinite<NewsReturn>(getKey, http, {
    suspense,
    refreshInterval,
  });
};
