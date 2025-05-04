import { queryOptions } from '@tanstack/react-query'
import { isArray, isNil, omitBy } from 'lodash'
import { coinsMarkets } from '/lib/api/coingecko/api'
import type { CoinsMarkets } from '/lib/api/coingecko/model'
import type { PriceChangePercentage } from '/lib/api/coingecko/model/common'

interface Params
  extends Omit<CoinsMarkets.Request, 'ids' | 'price_change_percentage'> {
  ids?: string | string[]
  price_change_percentage?: PriceChangePercentage | PriceChangePercentage[]
}

const coinsMarketsQuery = (params: Params) => {
  const { ids, price_change_percentage, ...restParams } = params
  const joinedIds = Array.isArray(ids) ? ids.join(',') : ids
  const joinedPriceChangePercentage = isArray(price_change_percentage)
    ? price_change_percentage.join(',')
    : price_change_percentage

  return queryOptions({
    queryKey: [{ scope: 'coinsMarkets', ...params }],
    queryFn: () =>
      coinsMarkets({
        ...omitBy(
          {
            ids: joinedIds,
            price_change_percentage: joinedPriceChangePercentage,
          },
          isNil
        ),
        ...restParams,
      }),
  })
}

export default coinsMarketsQuery
