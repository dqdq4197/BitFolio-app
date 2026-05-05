export type MarketCapChangePercentage24h = {
  btc: number
  usd: number
}

export type TrendingCategoryData = {
  /** category market cap */
  market_cap: number
  /** category market cap in btc */
  market_cap_btc: number
  /** category total volume */
  total_volume: number
  /** category total volume in btc */
  total_volume_btc: number
  /** category market cap change percentage in 24 hours */
  market_cap_change_percentage_24h: MarketCapChangePercentage24h
  /** category sparkline image url */
  sparkline: string
}

export type TrendingCategory = {
  id: number
  /** category name */
  name: string
  /** category market cap 1 hour change */
  market_cap_1h_change: number
  /** category web slug */
  slug: string
  /** category number of coins */
  coins_count: number
  data: TrendingCategoryData
}
