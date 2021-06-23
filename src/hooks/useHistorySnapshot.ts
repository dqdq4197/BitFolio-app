import useRequest from './useRequest';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import { CoinHistorySnapshotReturn } from '/lib/api/CoinGeckoReturnType';


type SearchDataProps = {
  suspense?: boolean
  id: string
  date: string
  willNotRequest?: boolean
}

const useHistorySnapshot = ({ 
  id, 
  date,
  willNotRequest = false,
  suspense = true
}: SearchDataProps) => {

  const getKey = willNotRequest 
    ? null 
    : CoinGecko.coin.historySnapshot(id, {
        date
      })

  console.log('getKey', getKey)
  return useRequest<CoinHistorySnapshotReturn>(getKey, http, { suspense })
}

export default useHistorySnapshot;