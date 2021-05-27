import useRequest from './useRequest';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import { SearchTrandingReturn } from '/lib/api/CoinGeckoReturnType';


type SearchDataProps = {
  suspense?: boolean,
}
const useSearchData = ({ suspense = true }: SearchDataProps) => {

  const getKey = CoinGecko.coin.searchTranding()

  return useRequest<SearchTrandingReturn>(getKey, http, { suspense })
}

export default useSearchData;