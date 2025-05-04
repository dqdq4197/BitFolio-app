import { queryOptions } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { search } from '/lib/api/coingecko/api'
import type { Search } from '/lib/api/coingecko/model'

const searchQuery = (params: Search.Request) =>
  queryOptions({
    queryKey: [{ scope: 'search', ...params }],
    queryFn: () => {
      if (isEmpty(params.query)) {
        return Promise.resolve({
          coins: [],
          exchanges: [],
          icos: [],
        } satisfies Search.Response)
      }

      return search(params)
    },
  })

export default searchQuery
