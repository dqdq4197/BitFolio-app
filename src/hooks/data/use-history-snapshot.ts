import useRequest, { Config } from '../use-request'
import {
  CoinGecko,
  http,
  HistorySnapshotParams,
} from '@/lib/api/coin-gecko-client'
import { CoinHistorySnapshotReturn } from '@/types/coin-gecko-return-type'

interface SearchDataProps extends HistorySnapshotParams, Config {
  id: string
  willNotRequest?: boolean
}

const useHistorySnapshot = ({
  id,
  date,
  willNotRequest = false,
  suspense = true,
}: SearchDataProps) => {
  return useRequest<CoinHistorySnapshotReturn>(
    willNotRequest
      ? null
      : CoinGecko.coin.historySnapshot(id, {
          date,
        }),
    http,
    { suspense }
  )
}

export default useHistorySnapshot
