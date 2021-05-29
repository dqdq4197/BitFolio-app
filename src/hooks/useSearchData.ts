import useRequest from './useRequest';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import { SearchDataReturn } from '/lib/api/CoinGeckoReturnType';
import useLocales from './useLocales';


type SearchDataProps = {
  suspense?: boolean,
}
const useSearchData = ({ suspense = true }: SearchDataProps) => {

  const { language } = useLocales();

  const getKey = CoinGecko.coin.search({
    locale: language
  })

  return useRequest<SearchDataReturn>(getKey, http, { suspense })
}

export default useSearchData;