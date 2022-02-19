import useRequest, { Config } from '../useRequest';
import {
  CoinGecko,
  http,
  HistorySnapshotParams,
} from '/lib/api/CoinGeckoClient';
import { CoinHistorySnapshotReturn } from '/types/coinGeckoReturnType';

interface SearchDataProps extends HistorySnapshotParams, Config {
  id: string;
  willNotRequest?: boolean;
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
  );
};

export default useHistorySnapshot;
