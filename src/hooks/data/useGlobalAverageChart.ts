import { useState, useEffect, useMemo } from 'react';

import useRequest from '../useRequest';
import { useAppSelector } from '../useRedux';
import useCoinDetail from './useCoinDetail';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import filteredPriceData from '/lib/utils/filteredPriceData';
import { CHART_TIME_INTERVAL } from '/lib/constants/coingecko';
import type {
  ChartDataReturn,
  HistoricalOhlcReturn,
} from '/types/CoinGeckoReturnType';

type TProps = {
  id: string;
  enabled: boolean;
};

const INTERVAL = Object.entries(CHART_TIME_INTERVAL).map(interval => ({
  label: interval[0],
  value: interval[1],
}));

export default ({ id, enabled }: TProps) => {
  const { currency, chartOptions } = useAppSelector(
    state => state.baseSettingReducer
  );

  const timeFrame = useMemo(() => {
    return chartOptions.globalAverage.interval;
  }, [chartOptions]);

  const [points, setPoints] = useState<number[][]>();
  const [volumes, setVolumes] = useState<number[][]>();
  const [highestPrice, setHighestPrice] = useState<number[]>([]);
  const [lowestPrice, setLowestPrice] = useState<number[]>([]);

  const {
    data: candlesData,
    isLoading: candlesIsLoading,
    error: candlesError,
  } = useRequest<HistoricalOhlcReturn>(
    enabled
      ? CoinGecko.coin.historicalOhlc(id, {
          vs_currency: currency,
          days: timeFrame,
        })
      : null,
    http,
    { suspense: true, refreshInterval: 3 * 60 * 1000 }
  );

  const {
    data: lineData,
    isLoading: lineIsLoading,
    error: lineError,
  } = useRequest<ChartDataReturn>(
    enabled
      ? CoinGecko.coin.marketChart(id, {
          vs_currency: currency,
          days: timeFrame,
        })
      : null,
    http,
    { suspense: true, refreshInterval: 3 * 60 * 1000 }
  );

  const {
    data: detailData,
    isLoading: detailIsLoading,
    error: detailError,
  } = useCoinDetail({
    id,
  });

  useEffect(() => {
    if (lineData) {
      console.log(lineData.prices.length);
      const { prices, total_volumes } = filteredPriceData(lineData, timeFrame);
      const sortedPrices = lineData.prices.slice().sort((a, b) => a[1] - b[1]);

      setPoints(prices);
      setVolumes(total_volumes);
      setHighestPrice(sortedPrices.slice(-1)[0]);
      setLowestPrice(sortedPrices[0]);
    }
  }, [timeFrame, lineData]);

  const latestPrice = useMemo(() => {
    if (lineData) {
      return lineData?.prices.slice(-1)[0][1];
    }
    return 0;
  }, [lineData]);

  const priceChange24h = useMemo(() => {
    if (detailData) {
      return detailData?.market_data.price_change_24h_in_currency[currency];
    }
    return 0;
  }, [detailData, currency]);

  return {
    points: points as number[][],
    candles: candlesData as HistoricalOhlcReturn,
    volumes: volumes as number[][],
    changeRate:
      detailData?.market_data.price_change_percentage_24h_in_currency[currency],
    latestPrice,
    prevClosingPrice: latestPrice - priceChange24h,
    isLoading: candlesIsLoading || lineIsLoading || detailIsLoading || !points,
    error: candlesError || lineError || detailError,
    streamType: 'SNAPSHOT' as 'REALTIME' | 'SNAPSHOT',
    interval: INTERVAL,
  };
};
