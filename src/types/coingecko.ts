import { CHART_TIME_INTERVAL } from '/lib/constants/coingecko'

export type ChartTimeIntervalType =
  (typeof CHART_TIME_INTERVAL)[keyof typeof CHART_TIME_INTERVAL]
