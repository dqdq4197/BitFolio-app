import {
  STREAM_TYPE,
  CHANGE_STATE,
  EXCHANGE,
  CURRENCY,
  CHART_TYPE,
} from '/lib/constant'

export type TStreamType = (typeof STREAM_TYPE)[keyof typeof STREAM_TYPE]

export type ChangeStatusType = (typeof CHANGE_STATE)[keyof typeof CHANGE_STATE]

export type ExchangeType = (typeof EXCHANGE)[keyof typeof EXCHANGE]

export type CurrencyType = (typeof CURRENCY)[keyof typeof CURRENCY]

export type ChartType = (typeof CHART_TYPE)[keyof typeof CHART_TYPE]
