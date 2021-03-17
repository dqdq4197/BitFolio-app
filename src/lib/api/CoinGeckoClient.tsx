import { COINGECKO_PATH_PREFIX } from '/lib/constant';

export type CoinMarketsParams = {
  vs_currency: 'usd' | 'krw' | 'eur',
  ids?: string[] | string,
  order?: 'market_cap_desc' | 'market_cap_rank' | 'gecko_desc' | 'gecko_asc' | 'market_cap_asc' | 'market_cap_desc' | 'volume_asc' | 'volume_desc' | 'id_asc' | 'id_desc',
  per_page?: number, // 1...250
  page?: number,
  sparkline?: boolean,
  price_change_percentage?: '1h' | '24h' | '7d' | '14d' | '30d' | '200d' | '1y'
}

type MarketChartParams = {
  vs_currency: 'usd' | 'krw' | 'eur',
  days: number | 'max',
  interval?: 'daily' // 90일 이전 설정하더라도 daily 간격 출력
}

type HistorySnapshotParams = {
  data: string,  //ex) dd-mm-yyyy
  localization?: boolean
}

type MarketChartRangeParams = {
  vs_currency:'usd' | 'krw' | 'eur',
  from: number, //UNIX TimeStamp 
  to: number //UNIX TimeStamp
}

type HistoricalOhlcParams = {
  vs_currency:'usd' | 'krw' | 'eur',
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

export const CoinGecko = {
  coin: {
    markets: (params:CoinMarketsParams) => {
      if(Array.isArray(params.ids)) {
        params.ids = params.ids.join(',');
      }
      return {
        url: `${COINGECKO_PATH_PREFIX}/coins/markets`,
        params
      }
    },
      
      /**
       * ! 시간이 일정하지 않음.
       * ! days 1일까지는 분 간격
       * ! 1~ 90일은 시간 간격
       * ! 90 ~  daily 간격
       * @param id Coin Symbol
       */
    marketChart: (id:string, params:MarketChartParams) => {
      return {
        url: `${COINGECKO_PATH_PREFIX}/coins/${id}/market_chart`,
        params
      }
    },
    DetailInfo: (id:string, params:DetailInfoParams) => {
      return {
        url: `${COINGECKO_PATH_PREFIX}/coins/${id}`,
        params
      }
    },
    historySnapshot: (id:string, params:HistorySnapshotParams) => {
      return {
        url: `${COINGECKO_PATH_PREFIX}/coins/${id}/history`,
        params
      }
    },
    marketChartRange: (id:string, params:MarketChartRangeParams) => {
      return {
        url: `${COINGECKO_PATH_PREFIX}/coins/${id}/market_chart/range`,
        params
      }
    },
    /**
     * @return
     * 1 - 2 days: 30 minutes
     * 3 - 30 days: 4 hours
     * 31 and before: 4 days
     */
    historicalOhlc: (id:string, params:HistoricalOhlcParams) => {
      return {
        url: `${COINGECKO_PATH_PREFIX}/coins/${id}/ohlc`,
        params
      }
    },   
  }
} 
