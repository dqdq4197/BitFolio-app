import useRequestInfinite from './useRequestInfinite';
import { AxiosResponse } from 'axios';
import { Cryptocompare, http } from '/lib/api/CryptocompareClient';
import { NewsReturn } from '/lib/api/CryptoCompareReturnType';



type ParamsType = {
  categories?: string | string[] 
  feeds?: string | string[]
  lTs?: number
  sortOrder?: 'latest' | 'popular'
  suspense?: boolean
  refreshInterval?: number
  willNotRequest?: boolean
}

export default ({
  categories = undefined,
  lTs = undefined,
  sortOrder = 'latest',
  feeds = undefined,
  suspense = true,
  refreshInterval,
  willNotRequest = false
}: ParamsType) => {

  const getKey = (pageIndex:number, previousPageData: AxiosResponse<unknown> | null) => {
    if (previousPageData && !(previousPageData as any).length) return null
    if(willNotRequest) return null;
    return Cryptocompare.news.articles({
      categories,
      feeds,
      sortOrder,
      lTs,
    })
  }
  

  return useRequestInfinite<NewsReturn>(
    getKey, http, { suspense, refreshInterval }
  );
}