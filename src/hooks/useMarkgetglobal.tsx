import useRequest from './useRequest';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import { GlobalReturn } from '/lib/api/CoinGeckoReturnType';


type SearchDataProps = {
  suspense?: boolean,
}
const useSearchData = ({ suspense = true }: SearchDataProps) => {

  const getKey = CoinGecko.coin.global()

  return useRequest<GlobalReturn>(getKey, http, { suspense })
}

export default useSearchData;