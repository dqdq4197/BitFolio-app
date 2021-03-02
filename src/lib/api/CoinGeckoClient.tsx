import { COINGECKO_PATH_PREFIX } from '/lib/constant';

type CoinMarketsParams = {
  vs_currency: 'usd' | 'krw' | 'eur',
  ids?: string[] | string,
  order?: 'market_cap_desc' | 'market_cap_rank' | 'gecko_desc' | 'gecko_asc' | 'market_cap_asc' | 'market_cap_desc' | 'volume_asc' | 'volume_desc' | 'id_asc' | 'id_desc',
  per_page?: number, // 1...250
  page?: number,
  sparkline?: boolean,
  price_change_percentage?: '1h' | '24h' | '7d' | '14d' | '30d' | '200d' | '1y'
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
    }
  }
} 