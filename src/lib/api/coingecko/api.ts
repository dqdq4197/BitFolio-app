import { httpClient } from '../httpClient'
import type { CoinsMarkets, Search, TrendingSearch } from './model'

const coinGeckoClient = httpClient.extend({
  prefixUrl: 'https://api.coingecko.com/api',
  headers: {
    x_cg_demo_api_key: process.env.EXPO_PUBLIC_COINGECKO_DEMO_API_KEY,
  },
})

export function coinsMarkets(params: CoinsMarkets.Request) {
  return coinGeckoClient.getRequest<
    CoinsMarkets.Request,
    CoinsMarkets.Response
  >('v3/coins/markets', { ...params })
}

export function search(params: Search.Request) {
  return coinGeckoClient.getRequest<Search.Request, Search.Response>(
    'v3/search',
    { ...params }
  )
}

export function trendingSearch(params: TrendingSearch.Request) {
  return coinGeckoClient.getRequest<
    TrendingSearch.Request,
    TrendingSearch.Response
  >('v3/search/trending', { ...params })
}
