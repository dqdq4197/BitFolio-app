import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { baseTypes } from 'base-types';
import i18n from '/lib/lang/i18n';
import { TAB_ROUTE_NAME } from '/lib/constant';

type DeviceSchemeType = Exclude<baseTypes.Theme, "default">
export type LocalSchemeType = Extract<baseTypes.Theme, "light" | "dark" | "default">
type ChartOptionType = 'prices' | 'total_volumes' | 'market_caps' | 'ohlc'

interface BaseSettingState {
  deviceScheme: DeviceSchemeType
  localScheme: LocalSchemeType
  currency: baseTypes.Currency
  chartOption: ChartOptionType
  chartTimeFrame: baseTypes.ChartTimeFrame
  recentlyViewed: string[]
  watchList: string[]
  recentSearches: string[]
  launchScreen: keyof typeof TAB_ROUTE_NAME 
}

const initialState: BaseSettingState = {
  deviceScheme: 'dark',
  localScheme: 'default',
  currency: 'krw',
  chartOption: 'prices',
  chartTimeFrame: 1,
  recentlyViewed: [],
  watchList: [],
  recentSearches: [''],
  launchScreen: TAB_ROUTE_NAME.home
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
    changeChartOption: (state, action: PayloadAction<ChartOptionType>) => {
      state.chartOption = action.payload
    },
    changeChartTimeFrame: (state, action: PayloadAction<baseTypes.ChartTimeFrame>) => {
      state.chartTimeFrame = action.payload
    },
    changeRecentlyViewed: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      let newRecentlyViewed = [];
      if(state.recentlyViewed.includes(payload)) {
        newRecentlyViewed = state.recentlyViewed.filter(coinId => coinId !== payload);
        newRecentlyViewed = [...newRecentlyViewed, payload];
      } else {
        newRecentlyViewed = [...state.recentlyViewed, payload];
      }
      if(newRecentlyViewed.length > 7) newRecentlyViewed.shift();
      state.recentlyViewed = newRecentlyViewed;
    },
    changeWatchList: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      let newWatchList = [];
      if(state.watchList.includes(payload)) {
        newWatchList = state.watchList.filter(coinId => coinId !== payload);
      } else {
        newWatchList = [...state.watchList, payload];
      }
      state.watchList = [...newWatchList];
    },
    changeRecentSearches: (state, action: PayloadAction<string>) => {
      let temp = state.recentSearches.filter(coinId => coinId !== action.payload);
      temp.unshift(action.payload);
      if(temp.length > 7) temp.pop();
      state.recentSearches = temp;
    }
  }
})

export const { 
  changeDeviceScheme,
  changeLocalScheme,
  changeCurrency,
  changeChartOption,
  changeChartTimeFrame,
  changeRecentlyViewed,
  changeWatchList,
  changeRecentSearches
} = baseSettingSlice.actions;
export default baseSettingSlice.reducer;