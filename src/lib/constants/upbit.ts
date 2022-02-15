import { t } from '/lib/utils/mappedType';

const UPBIT_API_VERSION = '1';
const UPBIT_BASE = 'https://api.upbit.com/';
export const UPBIT_PATH_PREFIX = `${UPBIT_BASE}v${UPBIT_API_VERSION}`;
export const UPBIT_WEBSOCKET_PREFIX = `wss://api.upbit.com/websocket/v1`;

export const CANDLE_PERIODICITY = t({
  MINUTES: 'minutes',
  DAYS: 'days',
  WEEKS: 'weeks',
  MONTHS: 'months',
});

export const CANDLE_MINUTE_UNIT = t({
  '1m': 1,
  '3m': 3,
  '5m': 5,
  '10m': 10,
  '15m': 15,
  '30m': 30,
  '1H': 60,
  '4H': 240,
});

export const CANDLE_PERIODICITY_UNIT = t({
  '1D': CANDLE_PERIODICITY.DAYS,
  '1W': CANDLE_PERIODICITY.WEEKS,
  '1M': CANDLE_PERIODICITY.MONTHS,
});

export const CHART_TIME_INTERVAL = {
  ...CANDLE_MINUTE_UNIT,
  ...CANDLE_PERIODICITY_UNIT,
};
