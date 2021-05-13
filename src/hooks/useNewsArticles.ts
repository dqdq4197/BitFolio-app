import useRequestInfinite from './useRequestInfinite';
import { AxiosResponse } from 'axios';
import { Cryptocompare, http } from '/lib/api/CryptocompareClient';
import { NewsReturn } from '/lib/api/CryptoCompareReturnType';



type ParamsType = {
  categories?: string | string[],
  lTs?: number,
  sortOrder?: 'latest' | 'popular',
  feeds?: string,
  suspense?: boolean,
  refreshInterval?: number,
}

export default ({
  categories,
  lTs,
  sortOrder,
  feeds,
  suspense,
  refreshInterval,
}: ParamsType) => {

  const getKey = (pageIndex:number, previousPageData: AxiosResponse<unknown> | null) => {
    return Cryptocompare.news.articles({
      categories,
      sortOrder,
      feeds,
      lTs,
    })
  }

  

  return useRequestInfinite<NewsReturn>(
    getKey, http, { suspense, refreshInterval }
  );
}