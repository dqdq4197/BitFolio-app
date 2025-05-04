import type { CoinMarket, CoinOrder } from './common'

export namespace CoinsMarkets {
  export interface Request {
    /** target currency of coins and market data (e.g., usd, eur) */
    vs_currency: string
    /** coins' IDs, comma-separated if querying more than one coin */
    ids?: string
    /** coins' names, comma-separated if querying more than one coin */
    names?: string
    /** coins' symbols, comma-separated if querying more than one coin */
    symbols?: string
    /** for symbol lookups, specify 'all' to include all matching tokens; default is 'top' */
    include_tokens?: 'all' | 'top'
    /** filter based on coins' category */
    category?: string
    /** sort result by field, default: 'market_cap_desc' */
    order?: CoinOrder
    /** total results per page, default: 100; valid values: 1–250 */
    per_page?: number
    /** page through results, default: 1 */
    page?: number
    /** include sparkline 7 days data, default: false */
    sparkline?: boolean
    /** include price change percentage timeframe, comma-separated (e.g., '1h,24h,7d') */
    price_change_percentage?: string
    /** language background, default: 'en' */
    locale?: string
    /** decimal place for currency price value */
    precision?: string
  }

  export type Response = CoinMarket[]
}
