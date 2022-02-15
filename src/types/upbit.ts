import {
  CANDLE_PERIODICITY,
  CHART_TIME_INTERVAL,
  CANDLE_MINUTE_UNIT,
} from '/lib/constants/upbit';
// 전역 const type

export type CandlePeriodicityType =
  typeof CANDLE_PERIODICITY[keyof typeof CANDLE_PERIODICITY];

export type ChartTimeIntervalType =
  typeof CHART_TIME_INTERVAL[keyof typeof CHART_TIME_INTERVAL];

export type CandleMinuteUnitType =
  typeof CANDLE_MINUTE_UNIT[keyof typeof CANDLE_MINUTE_UNIT];

// client params types

type PCandlesCommon = {
  market: string; // 마켓 코드 (ex. KRW-BTC)
  to?: string; // 마지막 캔들 시각 (exclusive). 포맷 : yyyy-MM-dd'T'HH:mm:ss'Z' or yyyy-MM-dd HH:mm:ss. 비워서 요청시 가장 최근 캔들
  count?: number; // 캔들 개수(최대 200개까지 요청 가능)
};

interface PCandles {
  minutes: PCandlesCommon & {
    // unit: 1 | 3 | 5 | 15 | 10 | 30 | 60 | 240; // 분 단위
  };
  days: PCandlesCommon & {
    convertingPriceUnit?: string; // 종가 환산 화폐 단위 (생략 가능, KRW로 명시할 시 원화 환산 가격을 반환.)
  };
  weeks: PCandlesCommon;
  months: PCandlesCommon;
}

export type CandlesParams<T extends keyof PCandles> = PCandles[T];

// upbitClient

export type UpBitClientType = {
  candles: <T extends CandlePeriodicityType>(
    periodicity: T,
    params: CandlesParams<T>,
    unit: T extends typeof CANDLE_PERIODICITY.MINUTES
      ? CandleMinuteUnitType
      : undefined
  ) => {
    url: string;
    params: CandlesParams<T>;
  };
};

// return types

export type RCandlesCommon = {
  market: string; // 마켓명
  candle_date_time_utc: string; // 캔들 기준 시각(UTC 기준)
  candle_date_time_kst: string; // 캔들 기준 시각(KST 기준)
  opening_price: number; // 시가
  high_price: number; // 고가
  low_price: number; // 저가
  trade_price: number; // 종가
  timestamp: number; // 해당 캔들에서 마지막 틱이 저장된 시각
  candle_acc_trade_price: number; // 누적 거래 금액
  candle_acc_trade_volume: number; // 누적 거래량
};

interface RCandle {
  minutes: RCandlesCommon & {
    unit: number; // 분 단위(유닛)
  };
  days: RCandlesCommon & {
    prev_closing_price: number; // 전일 종가(UTC 0시 기준)
    change_price: number; // 전일 종가 대비 변화 금액
    change_rate: number; // 전일 종가 대비 변화량
    converted_trade_price: number; // 종가 환산 화폐 단위로 환산된 가격(요청에  convertingPriceUnit // 파라미터 없을 시 해당 필드 포함되지 않음.)
  };
  weeks: RCandlesCommon & {
    first_day_of_period: string; // 캔들 기간의 가장 첫 날
  };
  months: RCandlesCommon & {
    first_day_of_period: string; // 캔들 기간의 가장 첫 날
  };
}

export type CandleReturn<T extends keyof RCandle> = RCandle[T];

// ----- socket return types -----

export type Ticker = {
  type: string; // ex. ticker
  code: string; // ex. KRW-BTC
  opening_price: number; // 시가
  high_price: number; // 고가
  low_price: number; // 저가
  trade_price: number; // 현재가
  prev_closing_price: number; // 전일 종가
  change: 'RISE' | 'EVEN' | 'FALL'; // 전일 대비['상승', '보합', '하락']
  change_price: number; // 부호 없는 전일 대비 값
  signed_change_price: number; // 전일 대비 값
  change_rate: number; // 부호 없는 전일 대비 등락율
  signed_change_rate: number; // 전일 대비 등락율
  trade_volume: number; // 가장 최근 거래량
  acc_trade_volume: number; // 누적 거래량(UTC 0시 기준)
  acc_trade_volume_24h: number; // 24시간 누적 거래량
  acc_trade_price: number; // 누적 거래대금(UTC 0시 기준)
  acc_trade_price_24h: number; // 24시간 누적 거래대금
  trade_date: string; //	tdt	최근 거래 일자(UTC)	String	yyyyMMdd
  trade_time: string; //	ttm	최근 거래 시각(UTC)	String	HHmmss
  trade_timestamp: number; // 체결 타임스탬프 (milliseconds)
  ask_bid: 'ASK' | 'BID'; // 매수/매도 구분
  acc_ask_volume: number; // 누적 매도량
  acc_bid_volume: number; // 누적 매수량
  highest_52_week_price: number; // 52주 최고가
  highest_52_week_date: string; // 52주 최고가 달성일	yyyy-MM-dd
  lowest_52_week_price: number; // 52주 최저가
  lowest_52_week_date: string; // 52주 최저가 달성일	String	yyyy-MM-dd
  trade_status: string; // 거래상태 *deprecated
  market_state: 'PREVIEW' | 'ACTIVE' | 'DELISTED'; // 거래상태 [입금지원, 거래지원가능, 거래지원종료]
  market_state_for_ios: string; // 거래 상태 *deprecated
  is_trading_suspended: boolean; // 거래 정지 여부
  delisting_date: Date; // 상장폐지일
  market_warning: 'NONE' | 'CAUTION'; // 유의 종목 여부 [해당없음, 투자주의]
  timestamp: number; // 타임스탬프 (milliseconds)
  stream_type: 'SNAPSHOT' | 'REALTIME'; // 스트림 타입 [스냅샷, 실시간]
};
