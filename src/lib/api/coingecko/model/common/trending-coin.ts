export interface PriceChangePercentage24h {
  btc: number
  usd: number
}

export interface TrendingCoinData {
  /** coin price in usd */
  price: number
  /** coin price in btc */
  price_btc: string
  /** coin price change percentage in 24 hours */
  price_change_percentage_24h: PriceChangePercentage24h
  /** coin market cap in usd */
  market_cap: string
  /** coin market cap in btc */
  market_cap_btc: string
  /** coin total volume in usd */
  total_volume: string
  /** coin total volume in btc */
  total_volume_btc: string
  /** coin sparkline image url */
  sparkline: string
  content: string
}

export interface TrendingCoinItem {
  /** coin ID */
  id: string
  coin_id: number
  /** coin name */
  name: string
  /** coin symbol */
  symbol: string
  /** coin market cap rank */
  market_cap_rank: number
  /** coin thumb image url */
  thumb: string
  /** coin small image url */
  small: string
  /** coin large image url */
  large: string
  /** coin web slug */
  slug: string
  /** coin price in btc */
  price_btc: number
  /** coin sequence in the list */
  score: number
  /** coin detailed data object */
  data: TrendingCoinData
}

export interface TrendingCoin {
  item: TrendingCoinItem
}
