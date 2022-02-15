import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { TextDecoder } from 'text-decoding';
import { v4 as uuidv4 } from 'uuid';
import { throttle } from 'lodash';

import useRequest from '../useRequest';
import { useAppSelector } from '/hooks/useRedux';
import { upbitClient, http } from '/lib/api/upbitClient';
import { intervalToTimeFrame } from '/lib/utils/upbit';
import {
  CHART_TIME_INTERVAL,
  CANDLE_PERIODICITY,
  UPBIT_WEBSOCKET_PREFIX,
} from '/lib/constants/upbit';
import type {
  CandleReturn,
  Ticker,
  RCandlesCommon,
  CandleMinuteUnitType,
} from '/types/upbit';

type TProps = {
  symbol: string;
  enabled: boolean;
};
const CANDLES_COUNT = 200;

const INTERVAL = Object.entries(CHART_TIME_INTERVAL).map(interval => ({
  label: interval[0],
  value: interval[1],
}));

const useUpbitChart = ({ symbol, enabled }: TProps) => {
  const webSocketRef = useRef<WebSocket | null>(null);
  const lastCandleTimestampRef = useRef<number>(0);
  const latestAccVolumeRef = useRef<number>(0);

  const { chartOptions } = useAppSelector(state => state.baseSettingReducer);

  const timeFrame = useMemo(
    () => intervalToTimeFrame(chartOptions.upbit.interval),
    [chartOptions]
  );
  const [marketCode] = useState(`KRW-${symbol.toUpperCase()}`);
  const [messageQueue, setMessageQueue] = useState<
    (Pick<RCandlesCommon, 'candle_acc_trade_volume'> &
      Pick<
        Ticker,
        | 'high_price'
        | 'low_price'
        | 'opening_price'
        | 'trade_price'
        | 'timestamp'
      > &
      Partial<CandleReturn<'minutes'> & Ticker>)[]
  >([]);
  const [socketError, setSocketError] = useState<string | null>(null);

  const {
    data: upbitData,
    error,
    isLoading,
    isValidating,
  } = useRequest<CandleReturn<'minutes'>[]>(
    enabled
      ? upbitClient.candles(
          timeFrame.periodicity,
          { market: marketCode, count: CANDLES_COUNT },
          timeFrame.unit as typeof timeFrame.periodicity extends typeof CANDLE_PERIODICITY.MINUTES
            ? CandleMinuteUnitType
            : undefined
        )
      : null,
    http,
    { suspense: true }
  );

  useEffect(() => {
    // * candles 스냅샷 데이터가 Timestamp 내림차순으로 옴.
    if (upbitData) {
      // 불변성 유지를 위해 데이터 복사.
      const mock = upbitData.slice();
      // 변하고있는 값이 아닌 interval간격의 가장 마지막 candle => mock[1]
      lastCandleTimestampRef.current = mock[1].timestamp;
      latestAccVolumeRef.current = mock[0].candle_acc_trade_volume;

      setMessageQueue(mock.sort((a, b) => a.timestamp - b.timestamp));
    }
  }, [upbitData]);

  /**
   * upbit의 경우 체결마다 실시간으로 새로운 가격을 할당하므로
   * socket message를 받아오는 횟수가 너무나도 빈번하다.
   * 매번 setState로 인한 리랜더링이 부담되기때문에
   * 다음과 같이 500초에 한번 차트 데이터를 업데이트시켜줍니다.
   * 또한 1분틱이나 3..5..10..의 경우 timestamp 또한 매번 업데이트시켜주면
   * x축 간격이 난장판 되므로 snapshot으로 가져온 과거 Data의 timestamp 간격에
   * 맞춰 초기화 해줍니다.
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttled = useCallback(
    throttle((data: Ticker) => {
      if (
        data.timestamp - lastCandleTimestampRef.current >=
        timeFrame.diffTimestamp
      ) {
        /**
         * 500ms동안 쌓인 누적 volume을 가장 최근 캔들에 더해주고,
         * 누적 volume(latestAccVolumeRef)을 새로 나타날 캔들(data)의 거래량으로 초기화
         * useCallback으로인해 messageQueue state가 업데이트 되지않기때문에
         * 객체 따로 만들지않고 바로 prev를 꺼내 씀.
         */
        setMessageQueue(prev => {
          const immutableData = prev.slice(1, prev.length - 1);
          const currentQueue = prev.slice(-1)[0];
          const updatedCurrentQueue = {
            ...currentQueue,
            candle_acc_trade_volume:
              latestAccVolumeRef.current - data.trade_volume,
          };
          const updatedNextQueue = {
            ...data,
            candle_acc_trade_volume: data.trade_volume,
            timestamp: currentQueue.timestamp + timeFrame.diffTimestamp,
            high_price: currentQueue.trade_price,
            low_price: currentQueue.trade_price,
            opening_price: currentQueue.trade_price,
          };

          return [...immutableData, updatedCurrentQueue, updatedNextQueue];
        });
        latestAccVolumeRef.current = data.trade_volume;
        lastCandleTimestampRef.current += timeFrame.diffTimestamp;
      } else {
        // Todo. 500ms 버퍼에 쌓인 데이터중 가장 high, low price로 입력해주어야 할듯.
        setMessageQueue(prev => {
          const immutableData = prev.slice(0, prev.length - 1);
          const currentQueue = prev.slice(-1)[0];
          const updatedCurrentQueue = {
            ...data,
            timestamp: lastCandleTimestampRef.current + timeFrame.diffTimestamp,
            candle_acc_trade_volume: latestAccVolumeRef.current,
            opening_price: currentQueue.opening_price,
            high_price: Math.max(currentQueue.high_price, data.trade_price),
            low_price: Math.min(currentQueue.low_price, data.trade_price),
          };

          return [...immutableData, updatedCurrentQueue];
        });
      }
    }, 500),
    [timeFrame]
  );

  const onMessage = useCallback(
    (event: WebSocketMessageEvent) => {
      if (!upbitData) return;
      const enc = new TextDecoder('utf-8');
      const arr = new Uint8Array(event.data);
      const data: Ticker = JSON.parse(enc.decode(arr));

      latestAccVolumeRef.current += data.trade_volume;

      throttled(data);
    },
    [throttled, upbitData]
  );

  const onClose = useCallback((e: CloseEvent) => {
    // Todo. 예기치 못하게 close된 경우 reconnect해주기 (Error의 경우도 포함)
    console.log(e.code, e.reason);
  }, []);

  const onError = useCallback((error: WebSocketErrorEvent | any) => {
    setSocketError(error.message);
  }, []);

  useEffect(() => {
    webSocketRef.current = new WebSocket(UPBIT_WEBSOCKET_PREFIX);
    const socket = webSocketRef.current;

    if (enabled) {
      socket.binaryType = 'arraybuffer';

      socket.onopen = () => {
        console.log('connected success');
        const send = [
          { ticket: uuidv4() },
          { type: 'ticker', codes: [marketCode] },
        ];
        socket.send(JSON.stringify(send));
      };

      socket.onclose = onClose;

      socket.onerror = onError;
    }

    return () => {
      socket.close();
    };
  }, [enabled, marketCode, onClose, onError]);

  useEffect(() => {
    if (webSocketRef.current && !isValidating) {
      webSocketRef.current.onmessage = onMessage;
    }
  }, [onMessage, isValidating]);

  const lastMessage = useMemo(() => {
    return messageQueue.slice(-1)[0];
  }, [messageQueue]);

  return {
    points: messageQueue.map(message => [
      message.timestamp,
      message.trade_price,
    ]),
    candles: messageQueue.map(message => [
      message.timestamp,
      message.opening_price,
      message.high_price,
      message.low_price,
      message.trade_price,
    ]),
    volumes: messageQueue.map(message => [
      message.timestamp,
      message.candle_acc_trade_volume,
    ]),
    changeRate:
      lastMessage?.signed_change_rate && lastMessage.signed_change_rate * 100,
    latestPrice: lastMessage?.trade_price,
    prevClosingPrice: lastMessage?.prev_closing_price,
    isLoading:
      isLoading || !lastMessage || !('prev_closing_price' in lastMessage),
    error: error || socketError,
    streamType: 'REALTIME' as 'REALTIME' | 'SNAPSHOT',
    interval: INTERVAL,
  };
};

export default useUpbitChart;
