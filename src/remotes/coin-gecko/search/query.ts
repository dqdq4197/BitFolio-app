import { queryOptions } from '@tanstack/react-query'
import type Coingecko from '@coingecko/coingecko-typescript'
import { client } from '../client'

export const searchQuery = (params: Coingecko.Search.SearchGetParams) =>
  queryOptions({
    queryKey: ['coin-gecko-search', params],
    queryFn: () => client.search.get(params),
  })

export const searchTrendingQuery = (
  params: Coingecko.Search.TrendingGetParams
) =>
  queryOptions({
    queryKey: ['coin-gecko-search-trending', params],
    queryFn: () => client.search.trending.get(params),
  })
