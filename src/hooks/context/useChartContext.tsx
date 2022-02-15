import React, { useContext, useState, createContext, useMemo } from 'react';
import Animated, { useSharedValue } from 'react-native-reanimated';
import type { chartType } from 'base-types';
import { AxiosError } from 'axios';

import { useCoinIdContext } from '/hooks/useCoinIdContext';
import { useAppSelector } from '/hooks/useRedux';
import useGlobalAverageChart from '/hooks/data/useGlobalAverageChart';
import useUpbitChart from '/hooks/data/useUpbitChart';

// * 중요
// isLoading이 false일 경우 모든 데이터가 정상적으로 load되어있어야함

type InitialData = {
  points: number[][];
  candles: number[][]; // tohlc
  volumes: number[][];
  latestPrice: number | undefined;
  changeRate: number | undefined;
  prevClosingPrice: number | undefined;
  isLoading: boolean;
  error: string | AxiosError<unknown> | null | undefined;
  streamType: 'REALTIME' | 'SNAPSHOT';
  interval: {
    label: string;
    value: string | number;
  }[];
  datumX: Animated.SharedValue<string>;
  datumY: Animated.SharedValue<string[]>;
  datumYChangePercentage: Animated.SharedValue<string>;
  isCursorActive: boolean;
  changeStatus: chartType.changeStatus;
  setters: {
    setIsCursorActive: React.Dispatch<React.SetStateAction<boolean>>;
    setChangeStatus: React.Dispatch<
      React.SetStateAction<chartType.changeStatus>
    >;
  };
};

type ProviderProps = {
  children: React.ReactNode;
};

const ChartContext = createContext<InitialData | undefined>(undefined);

export const ChartDataProvider = ({ children }: ProviderProps) => {
  const { exchange } = useAppSelector(state => state.baseSettingReducer);
  const { id, symbol } = useCoinIdContext();

  const datumX = useSharedValue('-');
  const datumY = useSharedValue(['-', '-']);
  const datumYChangePercentage = useSharedValue('-');
  const [isCursorActive, setIsCursorActive] = useState(false);
  const [changeStatus, setChangeStatus] = useState<chartType.changeStatus>(
    'RISE' || 'EVEN' || 'FALL'
  );

  const globalAverageData = useGlobalAverageChart({
    id,
    enabled: exchange === 'globalAverage',
  });

  const upbitData = useUpbitChart({
    symbol,
    enabled: exchange === 'upbit',
  });

  const cursorStates = useMemo(() => {
    return {
      datumX,
      datumY,
      datumYChangePercentage,
      isCursorActive,
      changeStatus,
      setters: {
        setIsCursorActive,
        setChangeStatus,
      },
    };
  }, [changeStatus, datumX, datumY, datumYChangePercentage, isCursorActive]);

  const asyncDatas = useMemo(() => {
    switch (exchange) {
      case 'upbit':
        return upbitData;
      default:
        return globalAverageData;
    }
  }, [exchange, upbitData, globalAverageData]);

  const initialData: InitialData = useMemo(
    () => ({
      ...asyncDatas,
      ...cursorStates,
    }),
    [asyncDatas, cursorStates]
  );

  return (
    <ChartContext.Provider value={initialData}>
      {children}
    </ChartContext.Provider>
  );
};

export function useChartState() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error(`Chart Context is undefined`);
  }
  return context;
}
