import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { baseTypes } from 'base-types'

import { CHART_TYPE, EXCHANGE, CURRENCY } from '/lib/constant'
import type { ChartTimeIntervalType as UpbitInterval } from '/types/upbit'
import type { ChartTimeIntervalType as CoingeckoInterval } from '/types/coingecko'
import type { ChartTimeIntervalType as BinanceInterval } from '/types/binance'
import type { ExchangeType, CurrencyType, ChartType } from '/types/common'
import type { MainTabParamList } from '/types/navigation'

type DeviceSchemeType = Exclude<baseTypes.Theme, 'default'>
export type LocalSchemeType = Extract<
  baseTypes.Theme,
  'light' | 'dark' | 'default'
>
interface ChartSettingState {
  exchange: ExchangeType // 활성화된 거래소
  chartOptions: {
    globalAverage: {
      interval: CoingeckoInterval
    }
    upbit: {
      interval: UpbitInterval
    }
    binance: {
      interval: BinanceInterval
    }
  }
  chartType: ChartType
}

type ChangeChartInterval = Pick<ChartSettingState, 'exchange'> & {
  interval: number | string
}

type TabRouteNameValue = keyof MainTabParamList

interface BaseSettingState extends ChartSettingState {
  deviceScheme: DeviceSchemeType // 기기에 설정된 scheme
  localScheme: LocalSchemeType // 앱 설정 scheme
  currency: CurrencyType // 앱 설정 통화
  chartTimeFrame: baseTypes.ChartTimeFrame
  recentlyViewed: string[] // 최근 본 코인 목록
  watchList: string[] // 즐겨찾기 리스트
  recentSearches: string[] // 최근 검색 목록
  launchScreen: TabRouteNameValue // 최초 앱 실행 screen
}

export const initialState: BaseSettingState = {
  deviceScheme: 'dark',
  localScheme: 'default',
  currency: CURRENCY.KRW,
  chartTimeFrame: 1,
  recentlyViewed: [],
  watchList: [],
  recentSearches: [''],
  launchScreen: 'Home',
  exchange: EXCHANGE.GLOBAL_AVERAGE,
  chartOptions: {
    globalAverage: {
      interval: 1,
    },
    upbit: {
      interval: 1,
    },
    binance: {
      interval: '1m',
    },
  },
  chartType: CHART_TYPE.LINE,
}

export const baseSettingSlice = createSlice({
  name: 'baseSetting',
  initialState,
  reducers: {
    changeDeviceScheme: (state, action: PayloadAction<DeviceSchemeType>) => {
      state.deviceScheme = action.payload
    },
    changeLocalScheme: (state, action: PayloadAction<LocalSchemeType>) => {
      state.localScheme = action.payload
    },
    changeCurrency: (state, action: PayloadAction<baseTypes.Currency>) => {
      state.currency = action.payload
    },
    changeChartType: (state, action: PayloadAction<ChartType>) => {
      state.chartType = action.payload
    },
    changeChartExchange: (state, action: PayloadAction<ExchangeType>) => {
      state.exchange = action.payload
    },
    changeChartInterval: (
      state,
      action: PayloadAction<ChangeChartInterval>
    ) => {
      const {
        payload: { exchange, interval },
      } = action
      state.chartOptions[exchange].interval = interval as any
    },
    changeRecentlyViewed: (state, action: PayloadAction<string>) => {
      const { payload } = action
      let newRecentlyViewed = []
      if (state.recentlyViewed.includes(payload)) {
        newRecentlyViewed = state.recentlyViewed.filter(
          coinId => coinId !== payload
        )
        newRecentlyViewed = [...newRecentlyViewed, payload]
      } else {
        newRecentlyViewed = [...state.recentlyViewed, payload]
      }
      if (newRecentlyViewed.length > 7) newRecentlyViewed.shift()
      state.recentlyViewed = newRecentlyViewed
    },
    changeWatchList: (state, action: PayloadAction<string>) => {
      const { payload } = action
      let newWatchList = []
      if (state.watchList.includes(payload)) {
        newWatchList = state.watchList.filter(coinId => coinId !== payload)
      } else {
        newWatchList = [...state.watchList, payload]
      }
      state.watchList = [...newWatchList]
    },
    changeRecentSearches: (state, action: PayloadAction<string>) => {
      const temp = state.recentSearches.filter(
        coinId => coinId !== action.payload
      )
      temp.unshift(action.payload)
      if (temp.length > 7) temp.pop()
      state.recentSearches = temp
    },
    changeLaunchScreen: (state, action: PayloadAction<TabRouteNameValue>) => {
      state.launchScreen = action.payload
    },
  },
})

export const {
  changeDeviceScheme,
  changeLocalScheme,
  changeCurrency,
  changeChartType,
  changeChartExchange,
  changeChartInterval,
  changeRecentlyViewed,
  changeWatchList,
  changeRecentSearches,
  changeLaunchScreen,
} = baseSettingSlice.actions
export default baseSettingSlice.reducer
