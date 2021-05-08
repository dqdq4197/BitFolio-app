import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { baseTypes } from 'base-types';
interface BaseSettingState {
  language: baseTypes.Language,
  currency: baseTypes.Currency,
  chartOption: 'prices' | 'total_volumes' | 'market_caps' | 'ohlc',
  chartTimeFrame: baseTypes.ChartTimeFrame,
  recentlyViewed: string[],
}

const initialState: BaseSettingState = {
  language: 'ko',
  currency: 'krw',
  chartOption: 'prices',
  chartTimeFrame: 1,
  recentlyViewed: [],
}

export const baseSettingSlice = createSlice({
  name: 'baseSetting',
  initialState,
  reducers: {
    changeCurrency: (state, action: PayloadAction<baseTypes.Currency>) => {
      state.currency = action.payload
    },
    changeChartOption: (state, action: PayloadAction<'prices' | 'total_volumes' | 'market_caps' | 'ohlc'>) => {
      state.chartOption = action.payload
    },
    changeChartTimeFrame: (state, action: PayloadAction<baseTypes.ChartTimeFrame>) => {
      state.chartTimeFrame = action.payload
    },
    changeRecentlyViewed: (state, action: PayloadAction<string>) => {
      let temp = state.recentlyViewed.filter(coinId => coinId !== action.payload);
      temp.unshift(action.payload);
      if(temp.length > 10) temp.pop();
      state.recentlyViewed = temp;
    }
  }
})

export const { 
  changeCurrency,
  changeChartOption,
  changeChartTimeFrame,
  changeRecentlyViewed
} = baseSettingSlice.actions;
export default baseSettingSlice.reducer;