export interface CoinMarket {
  /** coin ID */
  id: string
  /** coin symbol */
  symbol: string
  /** coin name */
  name: string
  /** coin image url */
  image: string
  /** coin current price in currency */
  current_price: number
  /** coin market cap in currency */
  market_cap: number
  /** coin rank by market cap */
  market_cap_rank: number
  /** coin fully diluted valuation (fdv) in currency */
  fully_diluted_valuation: number
  /** coin total trading volume in currency */
  total_volume: number
  /** coin 24hr price high in currency */
  high_24h: number
  /** coin 24hr price low in currency */
  low_24h: number
  /** coin 24hr price change in currency */
  price_change_24h: number
  /** coin 24hr price change in percentage */
  price_change_percentage_24h: number
  /** coin 24hr market cap change in currency */
  market_cap_change_24h: number
  /** coin 24hr market cap change in percentage */
  market_cap_change_percentage_24h: number
  /** coin circulating supply */
  circulating_supply: number
  /** coin total supply */
  total_supply: number
  /** coin max supply */
  max_supply: number
  /** coin all time high (ATH) in currency */
  ath: number
  /** coin all time high (ATH) change in percentage */
  ath_change_percentage: number
  /** coin all time high (ATH) date */
  ath_date: string // ISO 8601 format
  /** coin all time low (ATL) in currency */
  atl: number
  /** coin all time low (ATL) change in percentage */
  atl_change_percentage: number
  /** coin all time low (ATL) date */
  atl_date: string // ISO 8601 format
  /** return on investment */
  roi: string // could be object if more detail exists
  /** coin last updated timestamp */
  last_updated: string // ISO 8601 format
  /** coin 1h price change in percentage */
  price_change_percentage_1h: number
  /** coin price sparkline in 7 days */
  sparkline_in_7d: {
    /** array of prices */
    price: number[]
  }
}
