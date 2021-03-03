import useRequest from '/hooks/useRequest';
import { CoinGecko } from '/lib/api/CoinGeckoClient';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';


type MarketDataProps = {
  vsCurrency: 'usd' | 'krw' | 'eur',
  page: number,
  perPage: number,
}

export default ({vsCurrency ,page, perPage}: MarketDataProps) => {
  const { data, mutate } = useRequest<CoinMarketReturn[]>(
    CoinGecko.coin.markets({
      vs_currency: vsCurrency, 
      price_change_percentage:'24h', 
      page: page,
      order: 'market_cap_rank',
      per_page: perPage,
      sparkline: false,
    }), {
      suspense: true
    }
  )

  return {data, mutate}

}