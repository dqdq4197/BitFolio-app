import { queryOptions } from '@tanstack/react-query'
import { isArray, isNil, omitBy } from 'lodash'
import { trendingSearch } from '/lib/api/coingecko/api'
import type { TrendingSearch } from '/lib/api/coingecko/model'
import type { ShowMaxType } from '/lib/api/coingecko/model/common'

interface Params extends Omit<TrendingSearch.Request, 'show_max'> {
  show_max?: ShowMaxType[] | ShowMaxType
}

const trendingSearchQuery = (params: Params = {}) => {
  const { show_max, ...restParams } = params
  const joinedShowMax = isArray(show_max) ? show_max.join(',') : show_max

  return queryOptions({
    queryKey: [{ scope: 'trendingSearch', ...params }],
    queryFn: () =>
      trendingSearch(omitBy({ show_max: joinedShowMax, ...restParams }, isNil)),
  })
}

export default trendingSearchQuery
