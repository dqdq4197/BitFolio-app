import type { SearchCoin, SearchExchange, SearchIcos } from './common'

export namespace Search {
  export interface Request {
    /** search query */
    query: string
  }

  export interface Response {
    coins: SearchCoin[]
    exchanges: SearchExchange[]
    icos: SearchIcos[]
  }
}
