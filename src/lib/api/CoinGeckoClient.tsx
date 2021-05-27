import { COINGECKO_PATH_PREFIX, ORDER } from '/lib/constant';
import { baseTypes } from 'base-types';
import axios from 'axios';

export type ORDER = typeof ORDER[keyof typeof ORDER];

export type CoinMarketsParams = {
  vs_currency: baseTypes.Currency,
  ids?: string[] | string,
  order?: ORDER,
  per_page?: number, // 1...250
  page?: number,
  sparkline?: boolean,
  price_change_percentage?: PriceChangePercentageType | PriceChangePercentageType[] | string,
}

export type PriceChangePercentageType = '1h' | '24h' | '7d' | '14d' | '30d' | '200d' | '1y'
type SimplePriceParams = {
  ids: string[] | string,
  vs_currencies: baseTypes.Currency[] | string,
  include_market_cap?: boolean,
  include_24hr_vol?: boolean,
  include_24hr_change?: boolean,
  include_last_updated_at?: boolean,
}
type MarketChartParams = {
  vs_currency: baseTypes.Currency,
  days: number | 'max',
  interval?: 'daily' // 90일 이전 설정하더라도 daily 간격 출력
}

type HistorySnapshotParams = {
  data: string,  //ex) dd-mm-yyyy
  localization?: boolean
}

type MarketChartRangeParams = {
  vs_currency:baseTypes.Currency,
  from: number, //UNIX TimeStamp 
  to: number //UNIX TimeStamp
}

type HistoricalOhlcParams = {
  vs_currency:baseTypes.Currency,
  days: number | 'max', //Data up to number of days ago (1/7/14/30/90/180/365/max)
}

export type DetailInfoParams = {
  localization: boolean,
  tickers: boolean,
  market_data: boolean,
  community_data: boolean,
  developer_data: boolean,
  sparkline: boolean
}

export const http = axios.create({
  baseURL: COINGECKO_PATH_PREFIX,
})

export const CoinGecko = {
  coin: {
    /**
     * @description Use this to obtain all the coins market data (price, market cap, volume)
     * @function coin.markets()
     * @param {object} params - Parameters to pass through to the request
     * @param {string} params.vs_currency [default: usd] - The target currency of market data (usd, eur, krw, etc.)
     * @param {array|string} params.ids - List of coin id to filter if you want specific results
     * @param {string} params.order - Order results by CoinGecko.ORDER[*]
     * @param {number} params.per_page - Total results per page
     * @param {number} params.page - Page through results
     * @param {boolean} params.sparkline [default: false] - Include sparkline 7 days data (true/false)
     * @param {boolean} params.price_change_percentage Include price change percentage in 1h, 24h, 7d, 14d, 30d, 200d, 1y (eg. '1h,24h,7d' comma-separated, invalid values will be discarded)
     * @returns {ReturnObject}
     */
    markets: (params: CoinMarketsParams) => {
      if(Array.isArray(params.ids)) {
        params.ids = params.ids.join(',');
      }
      if(Array.isArray(params.price_change_percentage)) {
        params.price_change_percentage = params.price_change_percentage.join(',');
      }
      return {
        url: `/coins/markets`,
        params
      }
    },
    /**
     * @description Get simple price market data
     * @function coin.simplePrice()
     * @param {object} params - Parameters to pass through to the request
     * @param {array|string} params.ids - (Required) A single id or a list of coin ids to filter if you want specific results. Use coins.list() for a list of coin ids.
     * @param {array|string} params.vs_currencies - currencies 
     * @param {boolean} params.include_market_cap - is include market cap data?
     * @param {boolean} params.include_24hr_vol - is include 24 volume data?
     * @param {boolean} params.include_24hr_change - is include 24hr change price data?
     * @param {boolean} params.include_last_updated_at is include last updated time data?
     * @returns {ReturnObject}
     */
    simplePrice: (params: SimplePriceParams) => {
      if(Array.isArray(params.ids)) {
        params.ids = params.ids.join(',');
      }
      if(Array.isArray(params.vs_currencies)) {
        params.vs_currencies = params.vs_currencies.join(',');
      }
      return {
        url: `/simple/price`,
        params
      }
    },
    /**
      * @description Get historical market data include price, market cap, and 24h volume (granularity auto)
      * @function coin.marketChart()
      * @param {string} id - (Required) The coin id / eg. bitcoin
      * @param {object} params - Parameters to pass through to the request
      * @param {string} params.vs_currency [default: usd] - (Required) The target currency of market data (usd, eur, jpy, etc.)
      * @param {string} params.days [default: 1] - (Required) Data up to number of days ago (eg. 1,14,30,max)
      * @returns {ReturnObject}
      */
    marketChart: (id:string, params:MarketChartParams) => {
      return {
        url: `/coins/${id}/market_chart`,
        params
      }
    },
    DetailInfo: (id:string, params:DetailInfoParams) => {
      return {
        url: `/coins/${id}`,
        params
      }
    },
    search: (params: baseTypes.Language) => {
      return {
        url: `/search`,
        params
      }
    },
    searchTranding: () => {
      return {
        url: `/search/trending`,
      }
    },
    historySnapshot: (id:string, params:HistorySnapshotParams) => {
      return {
        url: `/coins/${id}/history`,
        params
      }
    },
    /**
      * @description Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto).
      *   Minutely data will be used for duration within 1 day.
      *   Hourly data will be used for duration between 1 day and 90 days.
      *   Daily data will be used for duration above 90 days.
      * @function coin.marketChartRange()
      * @param {string} id - (Required) The coin id / eg. bitcoin
      * @param {object} params - Parameters to pass through to the request
      * @param {string} params.vs_currency [default: usd] - (Required) The target currency of market data (usd, eur, jpy, etc.)
      * @param {number} params.from - (Required) From date in UNIX Timestamp (eg. 1392577232)
      * @param {number} params.to - (Required) To date in UNIX Timestamp (eg. 1422577232)
      * @returns {ReturnObject}
      */
    marketChartRange: (id:string, params:MarketChartRangeParams) => {
      return {
        url: `/coins/${id}/market_chart/range`,
        params
      }
    },

    historicalOhlc: (id:string, params:HistoricalOhlcParams) => {
      return {
        url: `/coins/${id}/ohlc`,
        params
      }
    },   
  }
} 
