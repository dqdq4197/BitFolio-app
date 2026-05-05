import type { TrendingCategory, TrendingCoin, TrendingNFT } from './common'

export namespace TrendingSearch {
  export interface Request {
    /**
     * show max number of results available for the given type
     * Available values: coins, nfts, categories
     * Example: coins or coins,nfts,categories
     * */
    show_max?: string
  }

  export interface Response {
    coins: TrendingCoin[]
    nfts: TrendingNFT[]
    categories: TrendingCategory[]
  }
}
