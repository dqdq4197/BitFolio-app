import useRequest from '../useRequest';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import { GlobalReturn } from '/types/CoinGeckoReturnType';

interface MarketGlobalProps {
  suspense?: boolean;
}
const useMarketGlobal = ({ suspense = true }: MarketGlobalProps) => {
  const getKey = CoinGecko.coin.global();

  return useRequest<GlobalReturn>(getKey, http, { suspense });
};

export default useMarketGlobal;
