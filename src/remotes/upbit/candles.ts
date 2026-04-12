import type { Options } from 'ky'
import { upbitClient } from './client'

export const candles = {
  /**
   * 초 단위 캔들 조회 API는 요청 시점을 기준으로 최근 3개월 이내의 데이터만 제공합니다.
   *
   * @example
   * const candlesBySeconds = await Upbit.Candles.getSeconds({ market: 'KRW-BTC' });
   */
  getSeconds: (params: Candles.GetSecondsParams, options?: Options) => {
    return upbitClient.getRequest<
      Candles.GetSecondsParams,
      Candles.GetSecondsResponse
    >('/candles/seconds', { ...params }, options)
  },

  getMinutes: (params: Candles.GetMinutesParams, options?: Options) => {
    const { unit, ...restParams } = params

    return upbitClient.getRequest<
      Candles.GetMinutesParams,
      Candles.GetMinutesResponse
    >(`/candles/minutes/${unit}`, { ...restParams }, options)
  },

  getDays: (params: Candles.GetDaysParams, options?: Options) => {
    return upbitClient.getRequest<
      Candles.GetDaysParams,
      Candles.GetDaysResponse
    >('/candles/days', { ...params }, options)
  },

  getWeeks: (params: Candles.GetWeeksParams, options?: Options) => {
    return upbitClient.getRequest<
      Candles.GetWeeksParams,
      Candles.GetWeeksResponse
    >('/candles/weeks', { ...params }, options)
  },

  getMonths: (params: Candles.GetMonthsParams, options?: Options) => {
    return upbitClient.getRequest<
      Candles.GetMonthsParams,
      Candles.GetMonthsResponse
    >('/candles/months', { ...params }, options)
  },

  getYears: (params: Candles.GetYearsParams, options?: Options) => {
    return upbitClient.getRequest<
      Candles.GetYearsParams,
      Candles.GetYearsResponse
    >('/candles/years', { ...params }, options)
  },
}

export namespace Candles {
  /** 모든 캔들 응답의 공통 필드 */
  interface ResponseItem {
    /** 마켓명 */
    market: string
    /** 캔들 기준 시각(UTC 기준) */
    candle_date_time_utc: string
    /** 캔들 기준 시각(KST 기준) */
    candle_date_time_kst: string
    /** 시가 */
    opening_price: number
    /** 고가 */
    high_price: number
    /** 저가 */
    low_price: number
    /** 종가 */
    trade_price: number
    /** 해당 캔들에서 마지막 틱이 저장된 시각 */
    timestamp: number
    /** 누적 거래 금액 */
    candle_acc_trade_price: number
    /** 누적 거래량 */
    candle_acc_trade_volume: number
  }

  export interface GetSecondsParams {
    /** 마켓 코드 (ex. KRW-BTC) */
    market: string
    /** 조회 기간의 종료 시각. 포맷: yyyy-MM-dd'T'HH:mm:ss'Z' */
    to?: string
    /** 캔들 개수 (최대 200개까지 요청 가능) @default 1 */
    count?: number
  }

  export type GetSecondsResponse = ResponseItem[]

  export interface GetMinutesParams {
    /** 마켓 코드 (ex. KRW-BTC) */
    market: string
    /** 조회 기간의 종료 시각. 포맷: yyyy-MM-dd'T'HH:mm:ss'Z' */
    to?: string
    /** 캔들 개수 (최대 200개까지 요청 가능) @default 1 */
    count?: number
    /** 분(Minute) 캔들 단위 */
    unit: 1 | 3 | 5 | 10 | 15 | 30 | 60 | 240
  }

  export type GetMinutesResponse = GetMinutesResponse.Item[]
  export namespace GetMinutesResponse {
    export interface Item extends ResponseItem {
      /** 분 단위(유닛) */
      unit: number
    }
  }

  export interface GetDaysParams {
    /** 마켓 코드 (ex. KRW-BTC) */
    market: string
    /** 조회 기간의 종료 시각. 포맷: yyyy-MM-dd'T'HH:mm:ss'Z' */
    to?: string
    /** 캔들 개수 (최대 200개까지 요청 가능) @default 1 */
    count?: number
    /** 종가 환산 통화. 사용시 응답에 converted_trade_price 필드가 추가로 반환됩니다. */
    convertingPriceUnit?: string
  }

  export type GetDaysResponse = GetDaysResponse.Item[]
  export namespace GetDaysResponse {
    export interface Item extends ResponseItem {
      /** 전일 종가(UTC 0시 기준) */
      prev_closing_price: number
      /** 전일 종가 대비 변화 금액 */
      change_price: number
      /** 전일 종가 대비 변화량 */
      change_rate: number
      /** 종가 환산 화폐 단위로 환산된 가격 (convertingPriceUnit 파라미터 없을 시 필드 생략됨) */
      converted_trade_price?: number
    }
  }

  export interface GetWeeksParams {
    /** 마켓 코드 (ex. KRW-BTC) */
    market: string
    /** 조회 기간의 종료 시각. 포맷: yyyy-MM-dd'T'HH:mm:ss'Z' */
    to?: string
    /** 캔들 개수 (최대 200개까지 요청 가능) @default 1 */
    count?: number
  }

  export type GetWeeksResponse = GetWeeksResponse.Item[]
  export namespace GetWeeksResponse {
    export interface Item extends ResponseItem {
      /** 캔들 기간의 가장 첫 날 */
      first_day_of_period: string
    }
  }

  export interface GetMonthsParams {
    /** 마켓 코드 (ex. KRW-BTC) */
    market: string
    /** 조회 기간의 종료 시각. 포맷: yyyy-MM-dd'T'HH:mm:ss'Z' */
    to?: string
    /** 캔들 개수 (최대 200개까지 요청 가능) @default 1 */
    count?: number
  }

  export type GetMonthsResponse = GetMonthsResponse.Item[]
  export namespace GetMonthsResponse {
    export type Item = GetWeeksResponse.Item
  }

  export interface GetYearsParams {
    /** 마켓 코드 (ex. KRW-BTC) */
    market: string
    /** 조회 기간의 종료 시각. 포맷: yyyy-MM-dd'T'HH:mm:ss'Z' */
    to?: string
    /** 캔들 개수 (최대 200개까지 요청 가능) @default 1 */
    count?: number
  }

  export type GetYearsResponse = ResponseItem[]
}
