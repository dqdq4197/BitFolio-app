import { CANDLE_PERIODICITY } from '/lib/constants/upbit';
import type {
  ChartTimeIntervalType,
  CandlePeriodicityType,
  CandleMinuteUnitType,
} from '/types/upbit';

export const intervalToTimeFrame = (interval: ChartTimeIntervalType) => {
  if (typeof interval === 'number') {
    return {
      periodicity: CANDLE_PERIODICITY.MINUTES as CandlePeriodicityType,
      unit: interval as CandleMinuteUnitType,
      diffTimestamp: interval * 60 * 1000,
    };
  }

  let diffTimestamp = 60 * 60 * 1000; // 1H

  if (interval === CANDLE_PERIODICITY.DAYS) {
    diffTimestamp *= 24; // 1D
  }

  if (interval === CANDLE_PERIODICITY.WEEKS) {
    diffTimestamp *= 7 * 24; // 1W
  }

  if (interval === CANDLE_PERIODICITY.MONTHS) {
    diffTimestamp *= 30 * 24; // 1M
  }

  return {
    periodicity: interval as CandlePeriodicityType,
    unit: undefined,
    diffTimestamp,
  };
};
